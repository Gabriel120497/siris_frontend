import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../css/dashboardCarousel.component.css']
})
export class DashboardComponent implements OnInit {

  cargando: boolean = false;
  slider: any[] = [];
  slides: any[] = [
    { nombre: 'Grupos de Proyeccion', modulo: 'GruposProyeccion' },
    { nombre: 'Instrumentos', modulo: 'Instrumentos' },
    //{ nombre: 'Equipos', modulo: 'Equipos' },
    { nombre: 'Salones', modulo: 'Salones' },
    { nombre: 'Cursos', modulo: 'Cursos' }
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
    this.cargando = true;
    this.setSlides(innerWidth);
    this.cargando = false;
  }

  moveLeft() {
    this.start = this.start - 1;
    this.setSlidesVar = this.setSlidesVar - 1;

  }

  moveRight() {
    this.start = this.start + 1;
    this.setSlidesVar = this.setSlidesVar + 1;
  }

  onResize(event: any) {
    this.setSlides(event.srcElement.innerWidth);
    //this.setSlides(event.)
  }

  setSlides(value: number) {
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
        if (modulo == 'GruposProyeccion') {
          this.route.navigate(['admin/Grupos-de-Proyeccion']);
        } else if (modulo == 'Cursos') {
          window.location.href = 'http://www2.politecnicojic.edu.co/polidinamico/polifomentocultural/pdfcinscripciones.php';

        } else {
          this.route.navigate(['/admin', modulo]);
        }
        break;

      case 'Profesor':
        if (modulo == 'GruposProyeccion') {
          this.route.navigate(['Grupos-de-Proyeccion']);

        } else if (modulo == 'Cursos') {
          window.location.href = 'http://www2.politecnicojic.edu.co/polidinamico/polifomentocultural/pdfcinscripciones.php';
        } else {
          this.route.navigate(['/teachers/reservas', modulo]);
        }
        break;

      case 'Comunidad':
        if (modulo == 'GruposProyeccion') {
          this.route.navigate(['Grupos-de-Proyeccion']);
        } else if (modulo == 'Cursos') {
          window.location.href = 'http://www2.politecnicojic.edu.co/polidinamico/polifomentocultural/pdfcinscripciones.php';
        } else {
          this.route.navigate(['/users/reservas', modulo]);
        }
        break;

      case 'Colaborador':
        if (modulo == 'GruposProyeccion') {
          this.route.navigate(['Grupos-de-Proyeccion']);
        } else if (modulo == 'Cursos') {
          window.location.href = 'http://www2.politecnicojic.edu.co/polidinamico/polifomentocultural/pdfcinscripciones.php';
        } else {
          this.route.navigate(['/users/reservas', modulo]);
        }
        break;

      case 'Cursos':
        this.route.navigate(['http://www2.politecnicojic.edu.co/polidinamico/polifomentocultural/pdfcinscripciones.php']);
        break;

      default:
        break;
    }

  }

}
