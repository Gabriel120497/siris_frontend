import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SalonesService } from 'src/app/services/salones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla-salones.component.html',
  styleUrls: ['../../../css/tabla.component.css']
})
export class TablaSalonesComponent implements OnInit {

  constructor(private route: Router, private salonesService: SalonesService, private usuariosService: UsuariosService) { }

  headerTabla: string[] = ['Ubicación'];
  salones: any[];
  verdeBtn: string = "bi bi-pencil";
  rojoBtn: string = "bi bi-trash";

  ngOnInit(): void {
    this.getSalones();
  }

  redirigir() {
    this.route.navigate([`/admin/agregar/Salones`]);
  }

  nuevaReserva() {
    this.route.navigate([`admin/reservas/Salones`]);
  }

  eliminarSalon(index: number) {
    console.log(this.salones[index].id);
    Swal.fire({
      title: 'Importante',
      text: '¿Está seguro que desea eliminar este salón?',
      icon: 'warning',
      confirmButtonColor: '#009045',
      confirmButtonText: 'Si',
      showDenyButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.salonesService.eliminarSalon(this.salones[index].id, this.usuariosService.getToken()).subscribe(
          (response: any) => {
            console.log(response.salon);
            Swal.fire({
              title: 'Éxito',
              text: `El grupo ${response.salon.ubicacion} ha sido eliminado`,
              icon: 'success',
              confirmButtonColor: '#009045',
              confirmButtonText: 'Confirmar'
            })
            this.getSalones();
          }, error => {
            Swal.fire({
              title: 'Fallido',
              text: error.error.message,
              icon: 'error',
              confirmButtonColor: '#009045',
              confirmButtonText: 'Confirmar'
            }).then((result) => {
              if (result.isConfirmed) {
                this.getSalones();
              }
            })
          });
      }
    })
  }

  getSalones() {
    this.salonesService.getSalones(this.usuariosService.getToken()).subscribe(
      (response: any) => {
        console.log(response.salones);
        this.salones = response.salones;
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
