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

  ngOnInit(): void {
    console.log(this.modulo);
    switch (this.modulo) {
      case 'Instrumentos':
        this.nuevaReservaBtn = true;
        this.headerTabla = ['Placa', 'Nombre', 'Tipo', 'Estado', 'Descripción Estado', 'Status', 'Habilitado Para', 'Trasladable', 'Salón'];
        break;

      case 'Equipos':
        this.nuevaReservaBtn = true;
        this.headerTabla = ['Placa', 'Nombre', 'Tipo', 'Estado', 'Descripción Estado'];
        break;
      case 'Salones':
        this.nuevaReservaBtn = true;
        this.headerTabla = ['Ubicación'];
        break;
      case 'Grupos-de-Proyeccion':
        this.nuevaReservaBtn = false;
        this.headerTabla = ['Nombre', 'Descripción', 'Profesor', 'Cupos Totales', 'Cupos Disponibles', 'Horario'];
        break;
      case 'Audiciones':
        this.nuevaReservaBtn = false;
        this.headerTabla = ['Solicitud', 'Nombre', 'Número de Contacto', 'Correo', 'Grupo'];
        break;
      case 'Mis-Grupos':
        this.nuevaReservaBtn = false;
        this.headerTabla = ['Código', 'Nombre', 'Descripción', 'Pre-Requisitos', 'Cupos Totales', 'Cupos Disponibles', 'Horario'];
        break;
      case 'Roles':
        this.nuevaReservaBtn = false;
        this.headerTabla = [ 'Rol','Nombre','Apellido', 'Tipo Documento', 'Número Documento', 'Número de contacto', 'Número de contacto 2', 'Correo'];
        break;


      default:
        break;
    }

    this.modulo = this.modulo.replaceAll('-', ' ')

  }

  redirigir() {
    this.route.navigate([`/admin/agregar/${this.modulo}`]);
  }

  nuevaReserva() {
    this.route.navigate([`admin/reservas/${this.modulo}`]);
  }
}
