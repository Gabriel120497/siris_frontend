import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { InstrumentosService } from 'src/app/services/instrumentos.service';

import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla-instrumentos.component.html',
  styleUrls: ['../../../css/tabla.component.css']
})
export class TablaInstrumentosComponent implements OnInit {

  constructor(private route: Router, private instrumentosService: InstrumentosService,
    private modalService: NgbModal, private usuariosService: UsuariosService) { }

  headerTabla: string[] = ['Placa', 'Nombre', 'Estado', 'Descripción Estado', 'Estatus', 'Habilitado Para'];
  instrumentos: any[];
  verdeBtn: string = "bi bi-pencil";
  rojoBtn: string = "bi bi-trash";
  instrumentoForm: FormGroup;

  closeResult: string = '';

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
    Swal.fire({
      title: 'Importante',
      text: '¿Está seguro que desea deshabilitar este instrumento?',
      icon: 'warning',
      confirmButtonColor: '#009045',
      confirmButtonText: 'Si',
      showDenyButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.instrumentos[index].estatus = 'Desahabilitado';

        this.instrumentosService.deshabilitarInstrumento(this.usuariosService.getToken(), this.instrumentos[index]).subscribe(
          (response: any) => {
            Swal.fire({
              title: 'Éxito',
              text: 'El instrumento se ha deshabilitado con éxito y ya no se podrá reservar más',
              icon: 'success',
              confirmButtonColor: '#009045',
              confirmButtonText: 'Confirmar'
            })
          }, error => {
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
    });

  }

  editar(index: number, content: any) {
    this.instrumentoForm = new FormGroup({
      nombre: new FormControl(this.instrumentos[index].nombre, Validators.required),
      placa: new FormControl(this.instrumentos[index].placa, Validators.required),
      estado: new FormControl(this.instrumentos[index].estado, Validators.required),
      estatus: new FormControl(this.instrumentos[index].estatus, Validators.required),
      descripcion_estado: new FormControl(this.instrumentos[index].descripcion_estado),
      habilitado_para: new FormControl(this.instrumentos[index].habilitado_para, Validators.required),
    });

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      if (result == 'Guardar') {
        this.instrumentosService.actualizarInstrumento(this.usuariosService.getToken(), this.instrumentoForm.value).subscribe(
          (response: any) => {
            Swal.fire({
              title: 'Éxito',
              text: 'El instrumento se ha actualizado con éxito',
              icon: 'success',
              confirmButtonColor: '#009045',
              confirmButtonText: 'Confirmar'
            });
            this.getInstrumentos();
          }, error => {
            Swal.fire({
              title: 'Fallido',
              text: error.error.message,
              icon: 'error',
              confirmButtonColor: '#009045',
              confirmButtonText: 'Confirmar'
            }).then((result) => {
              if (result.isConfirmed) {
                this.getInstrumentos();
              }
            })
          });
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });

  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getInstrumentos() {
    this.instrumentosService.getInstrumentos(this.usuariosService.getToken()).subscribe(
      (response: any) => {
        this.instrumentos = response.instrumentos;
      }, error => {
        Swal.fire({
          title: 'Fallido',
          text: error.error.message,
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
