import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-colaboradores',
  templateUrl: './tabla-colaboradores.component.html',
  styleUrls: ['../../../css/tabla.component.css']
})
export class TablaColaboradoresComponent implements OnInit {

  constructor(private route: Router, private usuariosService: UsuariosService,
    private modalService: NgbModal) { }

  headerTabla: string[] = ['Nombre', 'Perfil', 'Número de Contacto', 'Correo'];
  verdeBtn: string = "bi bi-pencil";
  rojoBtn: string = "bi bi-x-lg";
  colaboradores: any[];
  colaboradoresForm: FormGroup;
  cargando: boolean = false;

  ngOnInit(): void {
    this.getColaboradores();
  }

  nuevoColaborador() {
    this.route.navigate(['admin/agregar/Roles']);
  }

  getColaboradores() {
    this.cargando = true;
    this.usuariosService.getColaboradores(this.usuariosService.getToken()).subscribe(
      (response: any) => {
        this.colaboradores = response.colaboradores;
        this.cargando = false;

      }, error => {
        Swal.fire({
          title: 'Colaboradores',
          text: error.error.message,
          icon: 'warning',
          confirmButtonColor: '#009045',
          confirmButtonText: 'Confirmar'
        })
      });
  }

  eliminar(index: number) {
    Swal.fire({
      title: 'Importante',
      text: '¿Está seguro que desea eliminar este Colaborador?',
      icon: 'warning',
      confirmButtonColor: '#009045',
      confirmButtonText: 'Si',
      showDenyButton: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.cargando = true;
        this.usuariosService.eliminarColaborador(this.colaboradores[index].id, this.usuariosService.getToken()).subscribe(
          (response: any) => {
            Swal.fire({
              title: 'Éxito',
              text: `El colaborador ha sido eliminado`,
              icon: 'success',
              confirmButtonColor: '#009045',
              confirmButtonText: 'Confirmar'
            });
            this.cargando = false;

            this.getColaboradores();
          }, error => {
            Swal.fire({
              title: 'Fallido',
              text: error.error.message.nombre,
              icon: 'error',
              confirmButtonColor: '#009045',
              confirmButtonText: 'Confirmar'
            }).then((result) => {
              if (result.isConfirmed) {
                this.getColaboradores();
              }
            })
          });
      }
    })
  }

  editar(index: number, content: any) {

    this.colaboradoresForm = new FormGroup({
      id: new FormControl(this.colaboradores[index].id),
      nombre: new FormControl({ value: this.colaboradores[index].nombre + ' ' + this.colaboradores[index].apellido, disabled: true }, Validators.required),
      rol: new FormControl(this.colaboradores[index].rol),
      celular: new FormControl(this.colaboradores[index].celular, Validators.required),
      correo: new FormControl(this.colaboradores[index].correo, Validators.required),
    });
    console.log(this.colaboradoresForm.value);

    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

      if (result == 'Guardar') {
        this.cargando = true;
        this.usuariosService.actualizarColaborador(this.usuariosService.getToken(), this.colaboradoresForm.value).subscribe(
          (response: any) => {
            Swal.fire({
              title: 'Éxito',
              text: 'El colaborador se ha actualizado con éxito',
              icon: 'success',
              confirmButtonColor: '#009045',
              confirmButtonText: 'Confirmar'
            });
            this.cargando = false;
            this.getColaboradores();
          }, error => {
            Swal.fire({
              title: 'Fallido',
              text: error.error.message,
              icon: 'error',
              confirmButtonColor: '#009045',
              confirmButtonText: 'Confirmar'
            }).then((result) => {
              if (result.isConfirmed) {
                this.getColaboradores();
              }
            })
            this.cargando = false;
            this.getColaboradores();
          });
      }
    }, (reason) => {
    });

  }

}
