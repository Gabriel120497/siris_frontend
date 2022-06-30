import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  constructor(private router: ActivatedRoute, private route: Router) { }

  modulo: any = this.router.snapshot.paramMap.get('modulo');
  headerTabla: string[];
  nuevaReservaBtn: boolean;
  agregarBtn: boolean;
  editarBtn: boolean;
  eliminarBtn: boolean;
  aceptarBtn: boolean;
  rechazarBtn: boolean;

  ngOnInit(): void {
    console.log(this.modulo);
    switch (this.modulo) {
      case 'Instrumentos':
        this.nuevaReservaBtn = true;
        this.agregarBtn = true;
        this.editarBtn = true;
        this.eliminarBtn = true;
        this.aceptarBtn = false;
        this.rechazarBtn = false;
        this.headerTabla = ['Placa', 'Nombre', 'Tipo', 'Estado', 'Descripción Estado', 'Status', 'Habilitado Para', 'Trasladable', 'Salón'];
        break;

      case 'Equipos':
        this.nuevaReservaBtn = true;
        this.agregarBtn = true;
        this.editarBtn = true;
        this.eliminarBtn = true;
        this.aceptarBtn = false;
        this.rechazarBtn = false;
        this.headerTabla = ['Placa', 'Nombre', 'Tipo', 'Estado', 'Descripción Estado'];
        break;
      case 'Salones':
        this.nuevaReservaBtn = true;
        this.agregarBtn = true;
        this.editarBtn = true;
        this.eliminarBtn = true;
        this.aceptarBtn = false;
        this.rechazarBtn = false;
        this.headerTabla = ['Ubicación'];
        break;
      case 'Grupos-de-Proyeccion':
        this.nuevaReservaBtn = false;
        this.agregarBtn = true;
        this.editarBtn = true;
        this.eliminarBtn = true;
        this.aceptarBtn = false;
        this.rechazarBtn = false;
        this.headerTabla = ['Nombre', 'Descripción', 'Profesor', 'Cupos Totales', 'Cupos Disponibles', 'Horario'];
        break;
      case 'Audiciones':
        this.nuevaReservaBtn = false;
        this.agregarBtn = false;
        this.editarBtn = false;
        this.eliminarBtn = false;
        this.aceptarBtn = true;
        this.rechazarBtn = true;
        this.headerTabla = ['Solicitud', 'Nombre', 'Número de Contacto', 'Correo', 'Grupo'];
        break;
      case 'Mis-Grupos':
        this.nuevaReservaBtn = false;
        this.agregarBtn = false;
        this.editarBtn = true;
        this.eliminarBtn = true;
        this.aceptarBtn = false;
        this.rechazarBtn = false;
        this.headerTabla = ['Código', 'Nombre', 'Descripción', 'Pre-Requisitos', 'Cupos Totales', 'Cupos Disponibles', 'Horario'];
        break;
      case 'Roles':
        this.nuevaReservaBtn = false;
        this.agregarBtn = true;
        this.editarBtn = true;
        this.eliminarBtn = true;
        this.aceptarBtn = false;
        this.rechazarBtn = false;
        this.headerTabla = [ 'Rol','Nombre','Apellido', 'Tipo Documento', 'Número Documento', 'Número de contacto', 'Número de contacto 2', 'Correo'];
        break;

        case 'Estadisticas-de-Instrumentos':
          this.nuevaReservaBtn = false;
          this.agregarBtn = false;
          this.editarBtn = false;
          this.eliminarBtn = false;
          this.aceptarBtn = false;
          this.rechazarBtn = false;
        this.headerTabla = ['Mes', 'Año', 'Instrumento', 'Número de Prestamos'];
        break;

      case 'Estadisticas-de-Equipos':
        this.nuevaReservaBtn = false;
        this.agregarBtn = false;
        this.editarBtn = false;
        this.eliminarBtn = false;
        this.aceptarBtn = false;
        this.rechazarBtn = false;
        this.headerTabla = ['Mes', 'Año', 'Equipo', 'Número de Prestamos'];
        break;

      case 'Estadisticas-de-Salones':
        this.nuevaReservaBtn = false;
        this.agregarBtn = false;
        this.editarBtn = false;
        this.eliminarBtn = false;
        this.aceptarBtn = false;
        this.rechazarBtn = false;
        this.headerTabla = ['Mes', 'Año', 'Salón', 'Número de Prestamos'];
        break;
    
      case 'Estadisticas-de-Audiciones':
        this.nuevaReservaBtn = false;
        this.agregarBtn = false;
        this.editarBtn = false;
        this.eliminarBtn = false;
        this.aceptarBtn = false;
        this.rechazarBtn = false;
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
}
