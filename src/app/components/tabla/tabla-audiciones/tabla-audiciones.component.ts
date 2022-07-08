import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AudicionesService } from 'src/app/services/audiciones.service';
import { GruposService } from 'src/app/services/grupos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla-audiciones.component.html',
  styleUrls: ['../../../css/tabla.component.css']
})
export class TablaAudicionesComponent implements OnInit {

  constructor(private route: Router, private gruposService: GruposService,
    private audicionesService: AudicionesService) { }

  headerTabla: string[] = ['Solicitud', 'Nombre', 'Número de Contacto', 'Correo', 'Grupo'];
  audiciones: any[];
  verdeBtn: string = "bi bi-check-lg";
  rojoBtn: string = "bi bi-x-lg";
  cargando: boolean = false;

  ngOnInit(): void {
    this.getAudicionesPendientes();
  }

  nuevaAudicion() {
    this.route.navigate([`teachers/NuevaAudicion`]);
  }

  getAudicionesPendientes() {
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

  aceptarAudicion(index: number) {
    this.cargando = true;
    let audicion = {
      solicitud: this.audiciones[index].id,
      id_grupo: this.audiciones[index].id_grupo,
      estado_usuario: 'INTEGRANTE'
    }
    this.audicionesService.actualizarAudicion(audicion).subscribe((response: any) => {
      this.cargando = false;
      Swal.fire({
        title: 'Éxito',
        text: 'La audición se ha actualizado existosamente',
        icon: 'success',
        confirmButtonColor: '#009045',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.getAudicionesPendientes();
        }
      })
    }, error => {
      Swal.fire({
        title: 'Importante',
        text: error.error.message,
        icon: 'error',
        confirmButtonColor: '#009045',
        confirmButtonText: 'Confirmar'
      })
    });
  }

  rechazarAudicion(index: number) {
    this.cargando = true;
    let audicion = {
      solicitud: this.audiciones[index].id,
      id_grupo: this.audiciones[index].id_grupo,
      estado_usuario: 'RECHAZADO'
    }
    console.log(audicion);
    
    this.audicionesService.actualizarAudicion(audicion).subscribe((response: any) => {
      this.cargando = false;
      Swal.fire({
        title: 'Éxito',
        text: 'La audición se ha actualizado existosamente',
        icon: 'success',
        confirmButtonColor: '#009045',
        confirmButtonText: 'Confirmar'
      }).then((result) => {
        if (result.isConfirmed) {
          this.getAudicionesPendientes();
        }
      })
    }, error => {
      Swal.fire({
        title: 'Importante',
        text: error.error.message,
        icon: 'error',
        confirmButtonColor: '#009045',
        confirmButtonText: 'Confirmar'
      })
    });
  }

}
