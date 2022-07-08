import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['../../../css/formularioAdminAgregar.component.css']
})
export class RolesComponent implements OnInit {

  constructor(private router: ActivatedRoute, private route: Router, private usuariosService: UsuariosService) { }

  modulo: any = this.router.snapshot.url[2].path;
  nuevoColaboradorForm: FormGroup;
  nuevoColaborador: any;
  cargando: boolean = false;

  ngOnInit(): void {
    this.nuevoColaboradorForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      rol: new FormControl('', Validators.required),
      tipo_documento: new FormControl('', Validators.required),
      numero_documento: new FormControl('', Validators.required),
      celular: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email])
    });
  }

  guardar() {
    this.cargando = true;
    this.nuevoColaborador = {
      nombre: this.nuevoColaboradorForm.value.nombre,
      apellido: this.nuevoColaboradorForm.value.apellido,
      rol: this.nuevoColaboradorForm.value.rol,
      tipo_documento: this.nuevoColaboradorForm.value.tipo_documento,
      numero_documento: this.nuevoColaboradorForm.value.numero_documento,
      celular: this.nuevoColaboradorForm.value.celular,
      correo: this.nuevoColaboradorForm.value.correo
    }
    this.usuariosService.nuevoUsuario(this.nuevoColaborador, this.usuariosService.getToken()).subscribe(
      (response: any) => {
        this.cargando = false;
        Swal.fire({
          title: 'Éxito',
          text: `El usuario ${response.usuario.nombre} ${response.usuario.apellido} se ha creado exitosamente`,
          icon: 'success',
          confirmButtonColor: '#009045',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.route.navigate(['dashboard']);
          }
        })
      }, error => {
        this.cargando = false;
        Swal.fire({
          title: 'Importante',
          text: error.error.message,
          icon: 'error',
          confirmButtonColor: '#009045',
          confirmButtonText: 'Confirmar'
        })
      });
  }

  cancelar() {
    Swal.fire({
      title: '¿Está seguro que desea cancelar?',
      text: `Será redirigido al menú principal`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#009045',
      confirmButtonText: 'Confirmar',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.route.navigate(['dashboard']);
      }
    })
  }

}
