import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';


@Component({
  selector: 'app-full-screen',
  templateUrl: './full-screen.component.html',
  styles: [
    `
    #mapa{
      height: 100%;
      width: 100%;
    }
    `
  ]
})
export class FullScreenComponent implements OnInit {
  
  constructor() { }

  ngOnInit(): void {

    var map = new mapboxgl.Map({
    container: 'mapa',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [this.getRandomLong(), this.getRandomLat()],
    zoom: this.getRandomZoom()
    });

  }

  getRandomLat(){
    // var lat =  Math.random() * (41.40 - 41.39) + 41.39; // para bcn
    var lat =  Math.random() * (180)-90; // para todo el mundo
    console.log(lat);
    return lat;
  }

  getRandomLong(){
    // var long =  Math.random() * (2.14 - 2.15) + 2.15;  // para bcn
    var long =  Math.random() * (360)-180;  // para todo el mundo
    console.log(long);
    return long;
  }
  getRandomZoom(){
    var zoom = Math.floor(Math.random() * (20));
    console.log(zoom);
    return zoom;
  }

}
