import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-marcadores',
  templateUrl: './marcadores.component.html',
  styles: [
    `
    .mapa-container{
      height: 100%;
      width: 100%;
    }
    `
  ]
})
export class MarcadoresComponent implements AfterViewInit {

  @ViewChild('mapa') divMapa!: ElementRef;
  mapa!: mapboxgl.Map;
  zoomLevel: number = 15;
  center: [number, number] = [2.142905, 41.409254];
  
  constructor() { }

  ngAfterViewInit(): void {
    this.mapa = new mapboxgl.Map({
      container: this.divMapa.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v11',
      center:  this.center,
      zoom: this.zoomLevel
    });  

    const markerHtml: HTMLElement = document.createElement('div');
    markerHtml.innerHTML = 'Fridens';

    const marker = new mapboxgl.Marker({
      element: markerHtml
    })
      .setLngLat( this.center )
      .addTo( this.mapa );
  }

  

}
