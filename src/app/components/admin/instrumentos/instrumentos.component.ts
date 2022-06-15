import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instrumentos',
  templateUrl: './instrumentos.component.html',
  styleUrls: ['../../../css/formularioAdminAgregar.component.css']
})
export class InstrumentosComponent implements OnInit {

  constructor(private router: ActivatedRoute, private route: Router) { }

  modulo: any = this.router.snapshot.url[2].path;

  ngOnInit(): void {
    console.log(this.router.snapshot.url[2].path);
  }

  cancelar() {
    Swal.fire({
      title: 'Está seguro que desea cancelar?',
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
