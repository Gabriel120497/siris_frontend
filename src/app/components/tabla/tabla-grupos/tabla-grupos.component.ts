import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { GruposService } from 'src/app/services/grupos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

import Swal from 'sweetalert2';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla-grupos.component.html',
  styleUrls: ['../../../css/tabla.component.css']
})
export class TablaGruposComponent implements OnInit {

  constructor(private route: Router, private gruposService: GruposService,
    private usuariosService: UsuariosService, private modalService: NgbModal) { }

  headerTabla: string[] = ['Nombre', 'Descripción', 'Profesor', 'Cupos Totales', 'Cupos Disponibles', 'Salón', 'Horario'];
  grupos: any[];
  verdeBtn: string = "bi bi-pencil";
  rojoBtn: string = "bi bi-trash";
  gruposForm: FormGroup;
  profesores: any[];

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

  eliminarGrupo(index: number) {
    console.log(this.grupos[index].id);

    Swal.fire({
      title: 'Importante',
      text: '¿Está seguro que desea eliminar este grupo de proyección?',
      icon: 'warning',
      confirmButtonColor: '#009045',
      confirmButtonText: 'Si',
      showDenyButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.gruposService.eliminarGrupo(this.grupos[index].id, this.usuariosService.getToken()).subscribe(
          (response: any) => {
            console.log(response.grupo);
            Swal.fire({
              title: 'Éxito',
              text: `El grupo ${response.grupo.nombre} ha sido eliminado`,
              icon: 'success',
              confirmButtonColor: '#009045',
              confirmButtonText: 'Confirmar'
            })
            this.getGrupos();
          }, error => {
            Swal.fire({
              title: 'Fallido',
              text: error.error.message.nombre,
              icon: 'error',
              confirmButtonColor: '#009045',
              confirmButtonText: 'Confirmar'
            }).then((result) => {
              if (result.isConfirmed) {
                this.getGrupos();
              }
            })
          });
      }
    })
  }

  editar(index: number, content: any) {

    this.usuariosService.profesores(this.usuariosService.getToken()).subscribe(
      (response: any) => {
        console.log(response.profesores);
        this.profesores = response.profesores;
      }, error => {
      });

    console.log(this.grupos[index]);
    let cantidadEstudiantes = this.grupos[index].cupos_totales - this.grupos[index].cupos_restantes
    this.gruposForm = new FormGroup({
      id: new FormControl(this.grupos[index].id),
      nombre: new FormControl(this.grupos[index].nombre, Validators.required),
      descripcion: new FormControl(this.grupos[index].descripcion),
      profesor: new FormControl({value: this.grupos[index].profesor, disabled: true},Validators.required),
      cupos_totales: new FormControl(this.grupos[index].cupos_totales, Validators.required),
      cupos_restantes: new FormControl(''),
      prerequisitos: new FormControl(this.grupos[index].prerequisitos)
    });

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.gruposForm.value.cupos_restantes = this.gruposForm.value.cupos_totales - cantidadEstudiantes;
      console.log(this.gruposForm.value);
      if (result == 'Guardar') {
        this.gruposService.actualizarGrupo(this.usuariosService.getToken(), this.gruposForm.value).subscribe(
          (response: any) => {
            console.log(response);
            Swal.fire({
              title: 'Éxito',
              text: 'El instrumento se ha actualizado con éxito',
              icon: 'success',
              confirmButtonColor: '#009045',
              confirmButtonText: 'Confirmar'
            });
            this.getGrupos();
          }, error => {
            console.log(error.error.message.nombre);
            Swal.fire({
              title: 'Fallido',
              text: error.error.message,
              icon: 'error',
              confirmButtonColor: '#009045',
              confirmButtonText: 'Confirmar'
            }).then((result) => {
              if (result.isConfirmed) {
                this.getGrupos();
              }
            })
          });
      }
    }, (reason) => {
    });

  }

}
