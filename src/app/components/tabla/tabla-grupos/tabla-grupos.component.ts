import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GruposService } from 'src/app/services/grupos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla-grupos.component.html',
  styleUrls: ['../../../css/tabla.component.css']
})
export class TablaGruposComponent implements OnInit {

  constructor(private route: Router, private gruposService: GruposService) { }

  headerTabla: string[] = ['Nombre', 'Descripción', 'Profesor', 'Cupos Totales', 'Cupos Disponibles', 'Horario'];
  grupos: any[];
  verdeBtn: string = "bi bi-pencil";
  rojoBtn: string = "bi bi-trash";

  ngOnInit(): void {
    this.getGrupos();
  }

  redirigir() {
    this.route.navigate([`/admin/agregar/Grupos-de-Proyeccion`]);
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
