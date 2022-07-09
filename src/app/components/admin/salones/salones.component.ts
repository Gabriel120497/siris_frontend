import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SalonesService } from 'src/app/services/salones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-salones',
  templateUrl: './salones.component.html',
  styleUrls: ['../../../css/formularioAdminAgregar.component.css']
})
export class SalonesComponent implements OnInit {

  constructor(private router: ActivatedRoute, private route: Router,
    private salonesService:SalonesService, private usuariosService:UsuariosService) { }

  modulo: any = this.router.snapshot.url[2].path;
  cargando: boolean = false;
  nuevoSalonForm: FormGroup;

  ngOnInit(): void {
    this.nuevoSalonForm = new FormGroup({
      ubicacion: new FormControl('', Validators.required),
      numeroSalon: new FormControl('', Validators.required)
    });
  }

  nuevoSalon() {
    this.cargando = true;
    let salon = {
      ubicacion: this.nuevoSalonForm.value.ubicacion + '-' + this.nuevoSalonForm.value.numeroSalon
    }

    this.salonesService.nuevoSalon(salon, this.usuariosService.getToken()).subscribe(
      (response: any) => {
        this.cargando = false;

        Swal.fire({
          title: 'Éxito',
          text: 'El Salón se ha registrado correctamente',
          icon: 'success',
          confirmButtonColor: '#009045',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            this.route.navigate([`admin/${this.modulo}`]);
          }
        })
      }, error => {
        this.cargando = false;
        Swal.fire({
          title: 'Importante',
          text: `El salón ${salon.ubicacion} ya se existe`,
          icon: 'warning',
          confirmButtonColor: '#009045',
          confirmButtonText: 'Ok'
        })
      });

  }

  cancelar() {
    Swal.fire({
      title: '¿Está seguro que desea cancelar?',
      text: `Será redirigido a ${this.modulo}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#009045',
      confirmButtonText: 'Confirmar',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.route.navigate([`admin/${this.modulo}`]);
      }
    })
  }

}
