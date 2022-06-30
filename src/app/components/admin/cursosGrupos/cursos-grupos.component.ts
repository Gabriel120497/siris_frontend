import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GruposModel } from 'src/app/models/grupos';
import { GruposService } from 'src/app/services/grupos.service';
import { SalonesService } from 'src/app/services/salones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-cursos-grupos',
  templateUrl: './cursos-grupos.component.html',
  styleUrls: ['../../../css/formularioAdminAgregar.component.css']
})
export class CursosGruposComponent implements OnInit {

  constructor(private router: ActivatedRoute, private route: Router,
    private usuariosService: UsuariosService, private gruposService: GruposService,
    private salonesService:SalonesService) { }

  modulo: any = this.router.snapshot.url[2].path;
  profesores: any = [];
  salones: any = [];
  status: string;
  nuevoGrupoForm: any;
  nuevoGrupoRequest: GruposModel = new GruposModel;
  dias: any = [];
  agregar: boolean = false;
  horaInicial: any = { hour: 13, minute: 0 };
  horaFinal: any = { hour: 14, minute: 0 };

  ngOnInit(): void {
    this.nuevoGrupoForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      descripcion: new FormControl(''),
      profesor: new FormControl('', Validators.required),
      cupos_totales: new FormControl('', Validators.required),
      prerequisitos: new FormControl(''),

      horaInicio: new FormControl('', Validators.required),
      horaFin: new FormControl('', Validators.required),
      dia: new FormControl(''),
      id_salon_clase: new FormControl('', Validators.required),
    });

    this.usuariosService.profesores(localStorage.getItem('token') || "[]").subscribe(
      (response: any) => {
        console.log(response.profesores);
        this.profesores = response.profesores;
      }, error => {
        this.status = 'error';
      });

      this.salonesService.getSalones(localStorage.getItem('token') || "[]").subscribe(
        (response: any) => {
          console.log(response.salones);
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
    if (this.dias.length < 6) {
      this.dias.push({
        'dia': this.nuevoGrupoForm.value.dia,
        'hora_inicio': this.horaInicial.hour + ':' + this.horaInicial.minute,
        'hora_fin': this.horaFinal.hour + ':' + this.horaFinal.minute
      });
      this.nuevoGrupoForm.value.dia = '';
      this.nuevoGrupoForm.value.horaInicio = '';
      this.nuevoGrupoForm.value.horaFin = '';
    } else {
      this.agregar = true;
    }
    let profesor = this.profesores.filter((profesor: { id: any; }) => profesor.id = this.nuevoGrupoForm.value.profesor);
    this.nuevoGrupoRequest.nombre = this.nuevoGrupoForm.value.nombre;
    this.nuevoGrupoRequest.descripcion = this.nuevoGrupoForm.value.descripcion;
    this.nuevoGrupoRequest.profesor = profesor[0].nombre + ' ' + profesor[0].apellido
    this.nuevoGrupoRequest.cupos_totales = this.nuevoGrupoForm.value.cupos_totales;
    this.nuevoGrupoRequest.cupos_restantes = this.nuevoGrupoForm.value.cupos_totales;
    this.nuevoGrupoRequest.prerequisitos = this.nuevoGrupoForm.value.prerequisitos;
    this.nuevoGrupoRequest.horario = this.dias;
    this.nuevoGrupoRequest.id_salon_clases = this.nuevoGrupoForm.value.id_salon_clase;
    console.log(this.nuevoGrupoRequest);

    this.gruposService.nuevoGrupo(this.nuevoGrupoRequest, localStorage.getItem('token') || "[]").subscribe(
      (response: any) => {
        console.log(response.grupo);

        Swal.fire({
          title: 'Éxito',
          text: `Grupo creado exitosamente`,
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

  agregarDia() {
    console.log(this.dias);
    if (this.dias.length < 6) {
      this.dias.push({
        'dia': this.nuevoGrupoForm.value.dia,
        'hora_inicio': this.horaInicial.hour + ':' + this.horaInicial.minute,
        'hora_fin': this.horaFinal.hour + ':' + this.horaFinal.minute
      });
      this.nuevoGrupoForm.value.dia = '';
      this.nuevoGrupoForm.value.horaInicio = '';
      this.nuevoGrupoForm.value.horaFin = '';
    } else {
      this.agregar = true;
    }

  }

}
