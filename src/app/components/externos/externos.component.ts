import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GruposService } from 'src/app/services/grupos.service';
import { AudicionesService } from 'src/app/services/audiciones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

@Component({
  selector: 'app-externos',
  templateUrl: './externos.component.html',
  styleUrls: ['../../css/formularioAdminAgregar.component.css']
})

export class ExternosComponent implements OnInit {

  constructor(private router: ActivatedRoute, private route: Router, private location: Location,
    private audicionesService: AudicionesService, private gruposService: GruposService,
    private usuariosService: UsuariosService) { }

  nuevaAudicionForm: FormGroup;
  nuevaAudicion: any;
  teacher: boolean = false;
  grupos: any[];
  cargando: boolean = false;


  ngOnInit(): void {

    this.nuevaAudicionForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      grupo: new FormControl(''),
      tipo_documento: new FormControl('', Validators.required),
      numero_documento: new FormControl('', Validators.required),
      celular: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email]),
    });

    if (this.router.snapshot.url[0].path == 'teachers') {
      this.teacher = true;
    }

    this.cargando = true;
    this.getGrupos();
    this.cargando = false;

  }

  guardar() {
    this.cargando = true;
    this.nuevaAudicion = {
      nombre: this.nuevaAudicionForm.value.nombre,
      apellido: this.nuevaAudicionForm.value.apellido,
      tipo_documento: this.nuevaAudicionForm.value.tipo_documento,
      numero_documento: this.nuevaAudicionForm.value.numero_documento,
      celular: this.nuevaAudicionForm.value.celular,
      correo: this.nuevaAudicionForm.value.correo
    };
    if (this.teacher) {
      this.nuevaAudicion['id_grupo'] = +this.nuevaAudicionForm.value.grupo;
    } else {
      let grupoUrl = this.router.snapshot.paramMap.get('grupo')?.replace('%', ' ');
      this.nuevaAudicion['id_grupo'] = this.grupos.find(grupo => grupo.nombre == grupoUrl).id;
    }
    this.audicionesService.nuevaAudicion(this.nuevaAudicion).subscribe(
      (response: any) => {

        Swal.fire({
          title: 'Éxito',
          text: 'La audición se ha creado existosamente',
          icon: 'success',
          confirmButtonColor: '#009045',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.isConfirmed) {
            if (this.teacher) {
              this.route.navigate(['teachers/Audiciones']);
            } else {
              this.route.navigate(['login']);
            }
          }
        })
        //this.cargando = false;
      }, error => {
        Swal.fire({
          title: 'Importante',
          text: error.error.message,
          icon: 'error',
          confirmButtonColor: '#009045',
          confirmButtonText: 'Confirmar'
        })
      });
    this.cargando = false;
  }

  cancelar() {
    //this.getGrupos();
    Swal.fire({
      title: '¿Está seguro que desea cancelar?',
      text: 'Será redirigido a la pantalla anterior',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#009045',
      confirmButtonText: 'Confirmar',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.location.back();
      }
    })
  }

  getGrupos() {

    if (this.teacher) {

      this.gruposService.getMisGrupos(this.usuariosService.getNombre().replace(' ', '-'), this.usuariosService.getToken()).subscribe(
        (response: any) => {
          this.grupos = response.grupos;
        }, error => {
          Swal.fire({
            title: 'Fallido',
            text: error.error.message,
            icon: 'error',
            confirmButtonColor: '#009045',
            confirmButtonText: 'Confirmar'
          })
        });
    } else {
      this.gruposService.grupos().subscribe(
        (response: any) => {
          this.grupos = response.grupos;
        }, error => {
          Swal.fire({
            title: 'Fallido',
            text: error.error.message,
            icon: 'error',
            confirmButtonColor: '#009045',
            confirmButtonText: 'Confirmar'
          })
        });
    }

  }
}
