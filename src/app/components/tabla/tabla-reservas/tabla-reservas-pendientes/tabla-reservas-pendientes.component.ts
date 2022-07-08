import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ReservasService } from 'src/app/services/reservas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-reservas-pendientes',
  templateUrl: './tabla-reservas-pendientes.component.html',
  styleUrls: ['../../../../css/tabla.component.css']
})
export class TablaReservasPendientesComponent implements OnInit {

  constructor(private route: Router, private reservasService: ReservasService,
    private usuariosService: UsuariosService) { }

  headerTabla: string[] = ['ID Reserva', 'Usuario', 'Item', 'Documeto Usuario'];
  @Input() salones: any[];
  @Input() instrumentos: any[];
  @Input() equipos: any[];
  verdeBtn: string = "bi bi-play-fill";
  rojoBtn: string = "bi bi-stop-fill";

  ngOnInit(): void {
    this.getReservasPendientes();
  }

  aprobarReserva(index:number){}

  rechazarReserva(index:number){}

  getReservasPendientes() {
    this.reservasService.getReservaPendientes(this.usuariosService.getToken()).subscribe(
      (response: any) => {
        console.log(response.instrumentos);
        this.instrumentos = response.instrumentos;
        this.salones = response.salones;
        this.equipos = response.equipos;
      }, error => {
        Swal.fire({
          title: 'Reservas',
          text: error.error.message,
          icon: 'warning',
          confirmButtonColor: '#009045',
          confirmButtonText: 'Confirmar'
        })
      });

  }
}