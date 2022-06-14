import { Component, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    console.log(this.modulo);
    switch (this.modulo) {
      case 'Instrumentos':
        this.headerTabla = ['Placa', 'Nombre', 'Tipo', 'Estado', 'Descripción Estado', 'Status', 'Habilitado Para', 'Trasladable', 'Salón'];
        break;

      case 'Equipos':
        this.headerTabla = ['Placa', 'Nombre', 'Tipo', 'Estado', 'Descripción Estado'];
        break;
      case 'Salones':
        this.headerTabla = ['Ubicación'];
        break;
      case 'Grupos-de-Proyeccion':
        this.headerTabla = ['Nombre', 'Descripción', 'Profesor', 'Cupos Totales', 'Cupos Disponibles', 'Horario'];
        break;

      default:
        break;
    }

  }

  redirigir() {
    this.route.navigate([`/admin/agregar/${this.modulo}`]);
  }
}
