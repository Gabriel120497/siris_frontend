import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carga-archivos',
  templateUrl: './carga-archivos.component.html',
  //styleUrls: ['./carga-archivos.component.css']
  styleUrls: ['../../../css/formularioAdminAgregar.component.css']
})
export default class CargaArchivosComponent implements OnInit {

  constructor(private router: ActivatedRoute, private route: Router) { }

    ngOnInit(): void {
  }

  cancelar() {
    Swal.fire({
      title: '¿Está seguro que desea cancelar?',
      text: `Será redirigido a la página principal`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#009045',
      confirmButtonText: 'Confirmar',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.route.navigate([`dashboard`]);
      }
    })
  }

}
