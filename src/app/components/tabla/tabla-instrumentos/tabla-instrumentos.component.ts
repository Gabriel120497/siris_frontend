import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { InstrumentosService } from 'src/app/services/instrumentos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla-instrumentos.component.html',
  styleUrls: ['../../../css/tabla.component.css']
})
export class TablaInstrumentosComponent implements OnInit {

  constructor(private route: Router, private instrumentosService: InstrumentosService) { }

  headerTabla: string[] = ['Placa', 'Nombre', 'Tipo', 'Estado', 'Descripción Estado', 'Estatus', 'Habilitado Para', 'Trasladable', 'Salón'];
  instrumentos: any[];
  verdeBtn: string = "bi bi-pencil";
  rojoBtn: string = "bi bi-trash";

  ngOnInit(): void {
    this.getInstrumentos();
  }

  redirigir() {
    this.route.navigate([`/admin/agregar/Instrumentos`]);
  }

  nuevaReserva() {
    this.route.navigate([`admin/reservas/Instrumentos`]);
  }

  deshabilitar(index: any) {
    console.log(this.instrumentos[index]);
    Swal.fire({
      title: 'Importante',
      text: 'Está seguro que desea deshabilitar este instrumento?',
      icon: 'warning',
      confirmButtonColor: '#009045',
      confirmButtonText: 'Si',
      showDenyButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.instrumentos[index].estatus = 'Desahabilitado';
        console.log(this.instrumentos[index]);
        
        this.instrumentosService.deshabilitarInstrumento(localStorage.getItem('token') || [], this.instrumentos[index]).subscribe(
          (response: any) => {
            console.log(response);
            Swal.fire({
              title: 'Éxito',
              text: 'El instrumento se ha deshabilitado con éxito y ya no se podrá reservar más',
              icon: 'success',
              confirmButtonColor: '#009045',
              confirmButtonText: 'Confirmar'
            })
          }, error => {
            console.log(error.error.message.nombre);
            Swal.fire({
              title: 'Fallido',
              text: error.error.message.nombre,
              icon: 'error',
              confirmButtonColor: '#009045',
              confirmButtonText: 'Confirmar'
            }).then((result) => {
              if (result.isConfirmed) {
                this.getInstrumentos();
              }
            })

          })
      }
    })

  }

  getInstrumentos() {
    this.instrumentosService.getInstrumentos(localStorage.getItem('token') || []).subscribe(
      (response: any) => {
        console.log(response.instrumentos);
        this.instrumentos = response.instrumentos;
      }, error => {
        console.log(error.error.message.nombre);
        Swal.fire({
          title: 'Fallido',
          text: error.error.message.nombre,
          icon: 'error',
          confirmButtonColor: '#009045',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.route.navigate(['dashboard']);
          }
        })
      });
  }
}
