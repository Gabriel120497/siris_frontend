import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { ReservasService } from 'src/app/services/reservas.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-reservas-activas',
  templateUrl: './tabla-reservas-activas.component.html',
  styleUrls: ['../../../../css/tabla.component.css']
})
export class TablaReservasActivasComponent implements OnInit {

  constructor(private route: Router, private reservasService: ReservasService,
    private usuariosService: UsuariosService) { }
  
  headerTabla: string[] = ['ID Reserva', 'Usuario', 'Item', 'Documeto Usuario'];
  @Input() salones: any[];
  @Input() instrumentos: any[];
  @Input() equipos: any[];
  verdeBtn: string = "bi bi-play-fill";
  rojoBtn: string = "bi bi-stop-fill";

  ngOnInit(): void {
    
  }

  reclamarReserva(index: number) { }

  devolverReserva(index: number) { }

  getReservasActivas() {}
    /*this.reservasService.getReservasActivas(this.usuariosService.getToken()).subscribe(
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
  }*/
}
