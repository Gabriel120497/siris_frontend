import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  slider: any[] = [];
  slides: any[] = [
    { nombre: 'Reserva de Instrumentos', tipoReserva: 'Instrumentos' },
    { nombre: 'Reserva de Equipos', tipoReserva: 'Equipos' },
    { nombre: 'Reserva de Salones', tipoReserva: 'Salones' },
    { nombre: 'Grupos de Proyeccion' }
  ];

  start: number = 0;
  setSlidesVar: number = 0;

  constructor(private route: Router) { }

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

  verMas(tipoReserva: string) {
    this.route.navigate(['/reservas', tipoReserva]);
    switch (tipoReserva) {
      case 'Instrumentos'||'Salones':
        this.route.navigate(['/reservas', tipoReserva]);
        break;
      case 'Equipos':
        //this.route.navigate(['/reservas/reservaEquipos']);
        break;
      case 'GruposProyeccion':

        break;

      default:
        break;
    }
  }

}
