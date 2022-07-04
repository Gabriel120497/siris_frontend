import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GruposService } from 'src/app/services/grupos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla-audiciones.component.html',
  styleUrls: ['../../../css/tabla.component.css']
})
export class TablaAudicionesComponent implements OnInit {

  constructor(private route: Router, private gruposService: GruposService) { }

  headerTabla: string[] = ['Solicitud', 'Nombre', 'Número de Contacto', 'Correo', 'Grupo'];
  audiciones: any[];
  verdeBtn: string = "bi bi-check-lg";
  rojoBtn: string = "bi bi-x-lg";

  ngOnInit(): void {
    this.getSalones();
  }

  nuevaAudicion() {
    this.route.navigate([`teachers/NuevaAudicion`]);
  }

  getSalones() {
    this.gruposService.getAudicionesPendientes(JSON.parse(localStorage.getItem('identity') || ''),
      localStorage.getItem('token') || '').subscribe(
        (response: any) => {
          console.log(response.audiciones);
          this.audiciones = response.audiciones;
        }, error => {
          Swal.fire({
            title: 'Audiciones',
            text: error.error.message,
            icon: 'warning',
            confirmButtonColor: '#009045',
            confirmButtonText: 'Confirmar'
          })
        });
  }
}
