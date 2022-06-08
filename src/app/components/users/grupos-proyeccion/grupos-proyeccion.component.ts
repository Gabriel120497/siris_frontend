import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-grupos-proyeccion',
  templateUrl: './grupos-proyeccion.component.html',
  styleUrls: ['../../dashboard/dashboard.component.css']
})
export class GruposProyeccionComponent implements OnInit {

  slider: any[] = [];
  slides: any[] = [
    { nombre: 'Chirimia', tipoReserva: 'Chirimia' },
    { nombre: 'Banda de Rock', tipoReserva: 'BandaRock' },
    { nombre: 'Teatro', tipoReserva: 'Teatro' },
    { nombre: 'Coro', tipoReserva: 'Coro' }
  ];

  start: number = 0;
  setSlidesVar: number = 0;

  constructor() { }

  ngOnInit(): void {
    this.setSlides(innerWidth);
  }


  moveLeft() {
    this.start = this.start - 1;
    this.setSlidesVar = this.setSlidesVar - 1;
    console.log('left');

  }

  moveRight() {
    this.start = this.start + 1;
    this.setSlidesVar = this.setSlidesVar + 1;
    console.log('right');
  }

  onResize(event: any) {
    console.log(event.srcElement);
    this.setSlides(event.srcElement.innerWidth);
    //this.setSlides(event.)
  }

  setSlides(value: number) {
    console.log(value);

    if (value < 700) { this.setSlidesVar = 1; }
    else if (value >= 700 && value < 1300) { this.setSlidesVar = 2; }
    else if (value >= 1300 && value < 1600) { this.setSlidesVar = 3; }
    else {
      this.setSlidesVar = 4
    }
  }

  audicionar(tipoReserva: string) {
    console.log(`se manda correo al docente del grupo ${tipoReserva}`);
    
  }

}
