import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-externos',
  templateUrl: './externos.component.html',
  styleUrls: ['../../css/formularioAdminAgregar.component.css']
})


export class ExternosComponent implements OnInit {

  constructor(private router: ActivatedRoute, private route: Router) { }

    ngOnInit(): void {
  }

  cancelar() {
    Swal.fire({
      title: '¿Está seguro que desea cancelar?',
      text: `Será redirigido al Login`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#009045',
      confirmButtonText: 'Confirmar',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.route.navigate([`login`]);
      }
    })
  }
}
