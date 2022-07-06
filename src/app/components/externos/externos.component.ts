import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

import { Location } from '@angular/common';

@Component({
  selector: 'app-externos',
  templateUrl: './externos.component.html',
  styleUrls: ['../../css/formularioAdminAgregar.component.css']
})


export class ExternosComponent implements OnInit {
  teacher: boolean = false;

  constructor(private router: ActivatedRoute, private route: Router, private location: Location) { }

  ngOnInit(): void {
    console.log(this.router.snapshot.url[0].path);
    if (this.router.snapshot.url[0].path == 'teachers') {
      this.teacher = true;
    }

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
