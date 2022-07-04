import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { SalonesService } from 'src/app/services/salones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla-salones.component.html',
  styleUrls: ['../../../css/tabla.component.css']
})
export class TablaSalonesComponent implements OnInit {

  constructor(private route: Router, private salonesService: SalonesService) { }

  headerTabla: string[] = ['Ubicación'];
  salones: any[];
  verdeBtn: string = "bi bi-pencil";
  rojoBtn: string = "bi bi-trash";

  ngOnInit(): void {
    this.getSalones();
  }

  redirigir() {
    this.route.navigate([`/admin/agregar/Salones`]);
  }

  nuevaReserva() {
    this.route.navigate([`admin/reservas/Salones`]);
  }

  getSalones() {
    this.salonesService.getSalones(localStorage.getItem('token') || []).subscribe(
      (response: any) => {
        console.log(response.salones);
        this.salones = response.salones;
      }, error => {
        console.log(error.error.message.nombre);
        Swal.fire({
          title: 'Fallido',
          text: error.error.message.nombre,
          icon: 'error',
          confirmButtonColor: '#009045',
          confirmButtonText: 'Confirmar'
        })
      });
  }
}
