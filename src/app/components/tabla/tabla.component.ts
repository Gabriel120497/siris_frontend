import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GruposService } from 'src/app/services/grupos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['../../css/tabla.component.css']
})
export class TablaComponent implements OnInit {

  constructor(private router: ActivatedRoute, private route: Router, private gruposService: GruposService) { }

  modulo: any = this.router.snapshot.paramMap.get('modulo');
  headerTabla: string[];
  grupos: any[];
  nuevaReservaBtn: boolean;
  agregarBtn: boolean;
  verdeBtn: string;
  rojoBtn: string;

  ngOnInit(): void {
    console.log(this.modulo);
    switch (this.modulo) {
      case 'Audiciones':
        this.nuevaReservaBtn = false;
        this.agregarBtn = false;
        this.verdeBtn = "bi bi-check-lg";
        this.rojoBtn = "bi bi-x-lg";
        this.headerTabla = ['Solicitud', 'Nombre', 'Número de Contacto', 'Correo', 'Grupo'];
        break;
      case 'Mis-Grupos':
        this.nuevaReservaBtn = false;
        this.agregarBtn = false;
        this.verdeBtn = "bi bi-pencil";
        this.rojoBtn = "bi bi-trash";
        this.headerTabla = ['Código', 'Nombre', 'Descripción', 'Pre-Requisitos', 'Cupos Totales', 'Cupos Disponibles', 'Horario'];
        break;
      case 'Roles':
        this.nuevaReservaBtn = false;
        this.agregarBtn = true;
        this.verdeBtn = "bi bi-pencil";
        this.rojoBtn = "bi bi-trash";
        this.headerTabla = ['Rol', 'Nombre', 'Apellido', 'Tipo Documento', 'Número Documento', 'Número de contacto', 'Número de contacto 2', 'Correo'];
        break;

      case 'Estadisticas-de-Instrumentos':
        this.nuevaReservaBtn = false;
        this.agregarBtn = false;
        this.headerTabla = ['Mes', 'Año', 'Instrumento', 'Número de Prestamos'];
        break;

      case 'Estadisticas-de-Equipos':
        this.nuevaReservaBtn = false;
        this.agregarBtn = false;
        this.headerTabla = ['Mes', 'Año', 'Equipo', 'Número de Prestamos'];
        break;

      case 'Estadisticas-de-Salones':
        this.nuevaReservaBtn = false;
        this.agregarBtn = false;
        this.headerTabla = ['Mes', 'Año', 'Salón', 'Número de Prestamos'];
        break;

      case 'Estadisticas-de-Audiciones':
        this.nuevaReservaBtn = false;
        this.agregarBtn = false;
        this.headerTabla = ['Mes', 'Año', 'Grupo de Proyección', 'Número de Audiciones'];
        break;


      default:
        break;
    }

    this.modulo = this.modulo.replaceAll('-', ' ')

  }

  redirigir() {
    this.modulo = this.modulo.replaceAll(' ', '-')
    this.route.navigate([`/admin/agregar/${this.modulo}`]);
  }

  nuevaReserva() {
    this.route.navigate([`admin/reservas/${this.modulo}`]);
  }

  getGrupos() {
    this.gruposService.grupos().subscribe(
      (response: any) => {
        console.log(response.grupos);
        this.grupos = response.grupos;
      }, error => {
        console.log(error.error.message.nombre);
        Swal.fire({
          title: 'Fallido',
          text: error.error.message.nombre,
          icon: 'error',
          confirmButtonColor: '#009045',
          confirmButtonText: 'Confirmar'
        })
      });
  }
}
