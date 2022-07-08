import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GruposService } from 'src/app/services/grupos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-grupos-proyeccion',
  templateUrl: './grupos-proyeccion.component.html',
  styleUrls: ['../../../css/dashboardCarousel.component.css']
})
export class GruposProyeccionComponent implements OnInit {

  slider: any[] = [];
  grupos: any[] = [];

  start: number = 0;
  setSlidesVar: number = 0;

  constructor(private route: Router, private router: ActivatedRoute,
    private gruposService: GruposService, private usuariosService: UsuariosService) { }

  role: any = this.usuariosService.getRol();//this.router.snapshot.paramMap.get('role');

  ngOnInit(): void {
    this.getGrupos();
    this.setSlides(innerWidth);
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

  getGrupos() {
    this.gruposService.grupos().subscribe(
      (response: any) => {
        this.grupos = response.grupos;
      }, error => {
        Swal.fire({
          title: 'Importante',
          text: error.error.message,
          icon: 'warning',
          confirmButtonColor: '#009045',
          confirmButtonText: 'Confirmar'
        })
      });
  }

  audicionar(grupo: string) {
    if (this.role != 'Externos') {
      console.log(`se manda correo al docente del grupo ${grupo}`);
    } else {
      this.route.navigate(['externos/Audicion', grupo]);
    }
  }

  redirigir(opc: string) {
    this.route.navigate(['/teachers', opc]);
  }

}
