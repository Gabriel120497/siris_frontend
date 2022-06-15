import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../css/dashboardCarousel.component.css']
})
export class DashboardComponent implements OnInit {

  slider: any[] = [];
  slides: any[] = [
    { nombre: 'Instrumentos', tipoReserva: 'Instrumentos' },
    { nombre: 'Equipos', tipoReserva: 'Equipos' },
    { nombre: 'Salones', tipoReserva: 'Salones' },
    { nombre: 'Grupos de Proyeccion', tipoReserva: 'GruposProyeccion' }
  ];

  start: number = 0;
  setSlidesVar: number = 0;
  userRole: string = 'admin';

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
    switch (this.userRole) {
      case 'admin':
        if (tipoReserva !== 'GruposProyeccion') {
          this.route.navigate(['/admin', tipoReserva]);
        } else {
          this.route.navigate(['admin/Grupos-de-Proyeccion']);
        }
        break;

      case 'profesor':

        break;

      case 'comunidad':
        if (tipoReserva !== 'GruposProyeccion') {
          this.route.navigate(['/users/reservas', tipoReserva]);
        } else {
          this.route.navigate(['users/Grupos-de-Proyeccion']);
        }
        break;

      default:
        break;
    }

  }

}
