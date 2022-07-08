import { Component, DoCheck, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ReservasService } from 'src/app/services/reservas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-reservas',
  templateUrl: './tabla-reservas.component.html',
  styleUrls: ['./tabla-reservas.component.css']
})
export class TablaReservasComponent implements OnInit {

  constructor(private route: Router, private reservasService: ReservasService,
    private usuariosService: UsuariosService) { }

  admin: boolean = true;
  clicked: boolean = true;
  @Output() salonesActivos: any[];
  @Output() instrumentosActivos: any[];
  @Output() equiposActivos: any[];
  @Output() salonesPendientes: any[];
  @Output() instrumentosPendientes: any[];
  @Output() equiposPendientes: any[];
  @Output() salonesAprobados: any[];
  @Output() instrumentosAprobados: any[];
  @Output() equiposAprobados: any[];

  ngOnInit(): void {
    this.getReservasActivas();
    this.getReservasAprobadas();
  }

  getReservasActivas() {
    this.reservasService.getReservasActivas(this.usuariosService.getToken()).subscribe(
      (response: any) => {
        console.log(response.instrumentos);
        this.instrumentosActivos = response.instrumentos;
        this.salonesActivos = response.salones;
        this.equiposActivos = response.equipos;
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

  getReservasAprobadas() {
    this.reservasService.getReservasAprobadas(this.usuariosService.getToken()).subscribe(
      (response: any) => {
        this.instrumentosAprobados = response.instrumentos;
        this.salonesAprobados = response.salones;
        this.equiposAprobados = response.equipos;
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
