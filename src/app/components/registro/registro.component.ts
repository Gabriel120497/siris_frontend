import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['../../css/formularioAdminAgregar.component.css']
})
export class RegistroComponent implements OnInit {

  nuevoUsuarioForm: any;
  claveIgual: boolean;

  constructor(private route: Router, private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.nuevoUsuarioForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      tipo_documento: new FormControl('', Validators.required),
      numero_documento: new FormControl('', Validators.required),
      celular: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
      clave: new FormControl('', Validators.required),
      confirmarClave: new FormControl('', Validators.required),
      rol: new FormControl('')
    });
  }

  nuevoUsuario() {
    if (!this.nuevoUsuarioForm.value.correo.includes('@elpoli.edu.co')) {
      //Perfil Externo
      this.nuevoUsuarioForm.value.rol = 'Externo'
    } else {
      //Perfil Comunidad
      this.nuevoUsuarioForm.value.rol = 'Comunidad'
    }

    this.usuariosService.nuevoUsuario(this.nuevoUsuarioForm.value, this.usuariosService.getToken()).subscribe(
      (response: any) => {
        Swal.fire({
          title: 'Éxito',
          text: `El usuario ${response.usuario.nombre} ${response.usuario.apellido} se ha creado exitosamente`,
          icon: 'success',
          confirmButtonColor: '#009045',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.route.navigate(['login']);
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

  verificacion() {
    if (this.nuevoUsuarioForm.value.clave !== this.nuevoUsuarioForm.value.confirmarClave) {
      this.claveIgual = false;
    } else {
      this.claveIgual = true;
    }
  }

  cancelar() {
    Swal.fire({
      title: '¿Está seguro que desea cancelar?',
      text: `Será redirigido al inicio de sesión`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#009045',
      confirmButtonText: 'Confirmar',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.route.navigate(['login']);
      }
    })
  }

}
