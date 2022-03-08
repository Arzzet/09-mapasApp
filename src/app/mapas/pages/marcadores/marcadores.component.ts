import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

interface MarcadorColor{
  color: string;
  marker?: mapboxgl.Marker;
  centro?: [number, number];
}

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container{
      height: 100%;
      width: 100%;
    }
    .list-group {
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99;
    }
    li{
      cursor: pointer;
    }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [2.142905, 41.409254];

  marcadores: MarcadorColor[] = [];
  
  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center:  this.center,
      zoom: this.zoomLevel
    });  

    this.leerMarcadoresLocalStorage();

  //   const markerHtml: HTMLElement = document.createElement('div');
  //   markerHtml.innerHTML = 'Fridens';

  //   const marker = new mapboxgl.Marker({
  //     element: markerHtml
  //   })
  //     .setLngLat( this.center )
  //     .addTo( this.mapa );
  }
  
  agregarMarcador(){

    const color = "#xxxxxx".replace(/x/g, y=>(Math.random()*16|0).toString(16));

    // otra manera de generar color HEX aleatorio
    // const color = `#${crypto.getRandomValues(new Uint32Array(1))[0].toString(16).padStart(8, '0').slice(-6)}`;
    
    const nuevoMarcador = new mapboxgl.Marker({
      draggable: true,
      color
    })
      .setLngLat( this.center )
      .addTo( this.mapa );

    this.marcadores.push({
      color,
      marker: nuevoMarcador
    });

    this.guardarMarcadoresLocalStorage();

    nuevoMarcador.on('dragend', () => {
      this.guardarMarcadoresLocalStorage();
    });


  }

  irMarcador(marcadorActual: MarcadorColor){
    
    this.mapa.flyTo({
      center: marcadorActual.marker!.getLngLat(),
      zoom: this.zoomLevel
      });
  }

  borrarMarcador(index: number){
    this.marcadores[index].marker?.remove();
    this.marcadores.splice(index, 1);
    this.guardarMarcadoresLocalStorage();
  }
  guardarMarcadoresLocalStorage(){
    
    const lngLatArray: MarcadorColor[] = [];
    
    this.marcadores.forEach( marcador => {
    
      const color = marcador.color;
      const {lng, lat} = marcador.marker!.getLngLat();

      lngLatArray.push({
        color,
        centro: [lng, lat]
      });

    });

    localStorage.setItem('Marcadores', JSON.stringify(lngLatArray));
  }

  leerMarcadoresLocalStorage(){

    if(!localStorage.getItem('Marcadores')){
      return;
    }

    const lanLatArr: MarcadorColor[] = JSON.parse(localStorage.getItem('Marcadores')!);

    lanLatArr.forEach( marcador => {
      
      const newMarker = new mapboxgl.Marker({
        color: marcador.color,
        draggable: true
      })
        .setLngLat( marcador.centro! )
        .addTo( this.mapa );

      this.marcadores.push({
        color: marcador.color,
        marker: newMarker,

      });
    });

  }

}
