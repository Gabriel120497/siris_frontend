import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-externos',
  templateUrl: './externos.component.html',
  styleUrls: ['../../css/formularioAdminAgregar.component.css']
})


export class ExternosComponent implements OnInit {

  constructor(private router: ActivatedRoute, private route: Router, private location: Location) { }

  nuevaAudicionForm: FormGroup;
  nuevaAudicion: any;
  teacher: boolean = false;


  ngOnInit(): void {
    console.log(this.router.snapshot.url[0].path);
    if (this.router.snapshot.url[0].path == 'teachers') {
      this.teacher = true;
    }
    this.nuevaAudicionForm = new FormGroup({
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      grupo: new FormControl(''),
      tipo_documento: new FormControl('', Validators.required),
      numero_documento: new FormControl('', Validators.required),
      celular: new FormControl('', Validators.required),
      correo: new FormControl('', [Validators.required, Validators.email])
    });
  }

  guardar() {
    this.nuevaAudicion = {
      nombre: this.nuevaAudicionForm.value.nombre,
      apellido: this.nuevaAudicionForm.value.apellido,
      tipo_documento: this.nuevaAudicionForm.value.tipo_documento,
      numero_documento: this.nuevaAudicionForm.value.numero_documento,
      celular: this.nuevaAudicionForm.value.celular,
      correo: this.nuevaAudicionForm.value.celular
    };
    if (this.teacher) {
      this.nuevaAudicion['grupo'] = this.nuevaAudicionForm.value.grupo;
    } else {
      this.nuevaAudicion['grupo'] = this.router.snapshot.paramMap.get('grupo');
    }
    console.log(this.nuevaAudicion);

  }

  cancelar() {
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
}
