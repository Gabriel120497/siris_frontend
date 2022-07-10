import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GruposModel } from 'src/app/models/grupos';
import { GruposService } from 'src/app/services/grupos.service';
import { SalonesService } from 'src/app/services/salones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

import { FlatpickrModule } from 'angularx-flatpickr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos-grupos',
  templateUrl: './cursos-grupos.component.html',
  styleUrls: ['../../../css/formularioAdminAgregar.component.css']
})
export class CursosGruposComponent implements OnInit {

  constructor(private router: ActivatedRoute, private route: Router,
    private usuariosService: UsuariosService, private gruposService: GruposService,
    private salonesService: SalonesService) { }

  modulo: any = this.router.snapshot.url[2].path;
  profesores: any = [];
  salones: any = [];
  status: string;
  nuevoGrupoForm: any;
  nuevoGrupoRequest: GruposModel = new GruposModel;
  dias: any = [];
  agregar: boolean = false;
  hora = new Date;
  horaInicial: any = { hour: this.hora.getHours(), minute: this.hora.getMinutes() };
  horaFinal: any = { hour: this.hora.getHours() + 1, minute: this.hora.getMinutes() };
  cargando: boolean = false;

  ngOnInit(): void {
    this.nuevoGrupoForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl(''),
      profesor: new FormControl('', Validators.required),
      cupos_totales: new FormControl('', Validators.required),
      prerequisitos: new FormControl(''),

      horaInicio: new FormControl('', Validators.required),
      horaFin: new FormControl('', Validators.required),
      dia: new FormControl('', Validators.required),
      id_salon_clase: new FormControl('', Validators.required),
    });

    this.usuariosService.profesores(this.usuariosService.getToken()).subscribe(
      (response: any) => {
        this.profesores = response.profesores;
      }, error => {
        this.status = 'error';
      });

    this.salonesService.getSalones(this.usuariosService.getToken()).subscribe(
      (response: any) => {
        this.salones = response.salones;
      }, error => {
        this.status = 'error';
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

  guardar() {
    this.cargando = true;
    if (this.dias.length < 6) {
      if (this.horaInicial.hour < this.horaFinal.hour) {
        this.dias.push({
          'dia': this.nuevoGrupoForm.value.dia,
          'hora_inicio': this.horaInicial.hour + ':' + this.horaInicial.minute,
          'hora_fin': this.horaFinal.hour + ':' + this.horaFinal.minute
        });
        this.dias.splice(0, 1);
        let profesor = this.profesores.find((profe: { id: any; })  => profe.id == this.nuevoGrupoForm.value.profesor);        
        this.nuevoGrupoRequest.nombre = this.nuevoGrupoForm.value.nombre;
        this.nuevoGrupoRequest.descripcion = this.nuevoGrupoForm.value.descripcion;
        this.nuevoGrupoRequest.profesor = profesor.nombre + ' ' + profesor.apellido
        this.nuevoGrupoRequest.cupos_totales = this.nuevoGrupoForm.value.cupos_totales;
        this.nuevoGrupoRequest.cupos_restantes = this.nuevoGrupoForm.value.cupos_totales;
        this.nuevoGrupoRequest.prerequisitos = this.nuevoGrupoForm.value.prerequisitos != '' ? this.nuevoGrupoForm.value.prerequisitos : 'N/A';
        this.nuevoGrupoRequest.horario = this.dias;
        this.nuevoGrupoRequest.id_salon_clases = this.nuevoGrupoForm.value.id_salon_clase;

        this.gruposService.nuevoGrupo(this.nuevoGrupoRequest, this.usuariosService.getToken()).subscribe(
          (response: any) => {
            this.cargando = false;

            Swal.fire({
              title: 'Éxito',
              text: `Grupo de Proyección creado exitosamente`,
              icon: 'success',
              confirmButtonColor: '#009045',
              confirmButtonText: 'Confirmar'
            }).then((result) => {
              if (result.isConfirmed) {
                this.route.navigate(['admin/Grupos-de-Proyeccion']);
              }
            })

          }, error => {
            this.status = 'error';
            this.cargando = false;

            console.log(error.error.message.nombre);
            Swal.fire({
              title: 'Fallido',
              text: error.error.message,
              icon: 'error',
              confirmButtonColor: '#009045',
              confirmButtonText: 'Confirmar'
            })
          });
      } else {
        this.cargando = false;

        Swal.fire({
          title: 'Importante',
          text: 'La hora de inicio no puede ser mayor o igual a la hora final',
          icon: 'warning',
          confirmButtonColor: '#009045',
          confirmButtonText: 'Ok'
        })
      }

    } else {
      this.agregar = true;
    }
  }

  agregarDia() {
    if (this.dias.length < 6) {
      if (this.horaInicial.hour < this.horaFinal.hour) {
        this.dias.push({
          'dia': this.nuevoGrupoForm.value.dia,
          'hora_inicio': this.horaInicial.hour + ':' + this.horaInicial.minute,
          'hora_fin': this.horaFinal.hour + ':' + this.horaFinal.minute
        });
        if (this.dias.length == 2) {
          this.dias[0] = {
            'dia': this.nuevoGrupoForm.value.dia,
            'hora_inicio': this.horaInicial.hour + ':' + this.horaInicial.minute,
            'hora_fin': this.horaFinal.hour + ':' + this.horaFinal.minute
          }
        }
      } else {
        Swal.fire({
          title: 'Importante',
          text: 'La hora de inicio no puede ser mayor o igual a la hora final',
          icon: 'warning',
          confirmButtonColor: '#009045',
          confirmButtonText: 'Ok'
        })
      }

    } else {
      this.agregar = true;
    }

  }

}
