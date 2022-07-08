import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { EquiposService } from 'src/app/services/equipos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla-equipos.component.html',
  styleUrls: ['../../../css/tabla.component.css']
})
export class TablaEquiposComponent implements OnInit {

  constructor(private route: Router, private equiposService: EquiposService) { }

  headerTabla: string[] = ['Placa', 'Nombre', 'Tipo', 'Estado', 'Descripción Estado'];
  equipos: any[];
  verdeBtn: string = "bi bi-pencil";
  rojoBtn: string = "bi bi-trash";

  ngOnInit(): void {
    this.getEquipos();
  }

  redirigir() {
    this.route.navigate([`/admin/agregar/Equipos`]);
  }

  nuevaReserva() {
    this.route.navigate([`admin/reservas/Equipos`]);
  }

  getEquipos() {
    this.equiposService.getEquipos(localStorage.getItem('token') || []).subscribe(
      (response: any) => {
        console.log(response.equipos);
        this.equipos = response.equipos;
      }, error => {
        console.log(error.error.message);
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
