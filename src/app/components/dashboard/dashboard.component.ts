import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../css/dashboardCarousel.component.css']
})
export class DashboardComponent implements OnInit {

  slider: any[] = [];
  slides: any[] = [
    { nombre: 'Grupos de Proyeccion', modulo: 'GruposProyeccion' },
    { nombre: 'Instrumentos', modulo: 'Instrumentos' },
    { nombre: 'Equipos', modulo: 'Equipos' },
    { nombre: 'Salones', modulo: 'Salones' }
  ];

  start: number = 0;
  setSlidesVar: number = 0;
  userRole: string;
  identity: any;
  token: string | null;

  constructor(private route: Router, private usuariosService: UsuariosService) {
    this.identity = this.usuariosService.getIdentity();
    if (this.identity) {
      this.userRole = this.identity.rol; 
    }
    //this.token = usuariosService.getToken();
  }

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

  verMas(modulo: string) {
    switch (this.userRole) {
      case 'Admin':
        if (modulo !== 'GruposProyeccion') {
          this.route.navigate(['/admin', modulo]);
        } else {
          this.route.navigate(['admin/Grupos-de-Proyeccion']);
        }
        break;

      case 'Profesor':
        if (modulo !== 'GruposProyeccion') {
          this.route.navigate(['/users/reservas', modulo]);
        } else {
          this.route.navigate(['Grupos-de-Proyeccion/', this.userRole]);
        }
        break;

      case 'Comunidad':
        if (modulo !== 'GruposProyeccion') {
          this.route.navigate(['/users/reservas', modulo]);
        } else {
          this.route.navigate(['Grupos-de-Proyeccion/', this.userRole]);
        }
        break;

      default:
        break;
    }

  }

}
