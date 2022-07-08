import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InstrumentosService } from 'src/app/services/instrumentos.service';
import { SalonesService } from 'src/app/services/salones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instrumentos',
  templateUrl: './instrumentos.component.html',
  styleUrls: ['../../../css/formularioAdminAgregar.component.css']
})
export class InstrumentosComponent implements OnInit {

  nuevoInstrumentoForm: any;
  salones: any = [];
  status: string;

  constructor(private router: ActivatedRoute, private route: Router,
    private salonesService: SalonesService, private instrumentosService: InstrumentosService) { }

  modulo: any = this.router.snapshot.url[2].path;

  ngOnInit(): void {
    this.nuevoInstrumentoForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      placa: new FormControl('', Validators.required),
      estado: new FormControl('', Validators.required),
      trasladable: new FormControl('', Validators.required),
      id_salon: new FormControl('', Validators.required),
      estatus: new FormControl('', Validators.required),
      descripcion_estado: new FormControl(''),
      habilitado_para: new FormControl('', Validators.required),
    });
    this.salonesService.getSalones(localStorage.getItem('token') || "[]").subscribe(
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

  nuevoInstrumento() {
    let instrumento = {
      placa: this.nuevoInstrumentoForm.value.placa,
      nombre: this.nuevoInstrumentoForm.value.nombre,
      estado: this.nuevoInstrumentoForm.value.estado,
      estatus: this.nuevoInstrumentoForm.value.estatus,
      trasladable: this.nuevoInstrumentoForm.value.trasladable,
      descripcion_estado: this.nuevoInstrumentoForm.value.descripcion_estado,
      id_salon: null
    }

    if (this.nuevoInstrumentoForm.value.id_salon != "null") {
      instrumento.id_salon = this.nuevoInstrumentoForm.value.id_salon
    }

    this.instrumentosService.nuevoInstrumento(localStorage.getItem('token') || "[]", instrumento).subscribe(
      (response: any) => {
        Swal.fire({
          title: 'Éxito',
          text: 'El Instrumento se ha registrado correctamente',
          icon: 'success',
          confirmButtonColor: '#009045',
          confirmButtonText: 'Ok'
        }).then((result) => {
          if (result.isConfirmed) {
            this.route.navigate([`admin/${this.modulo}`]);
          }
        })
      }, error => {
        this.status = 'error';
        Swal.fire({
          title: 'Importante',
          text: `La placa ${instrumento.placa} ya se encuentra registrada`,
          icon: 'warning',
          confirmButtonColor: '#009045',
          confirmButtonText: 'Ok'
        })
      });

  }

}
