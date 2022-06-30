import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquiposModel } from 'src/app/models/equipos';
import { ReservasModel } from "src/app/models/reservas";
import { EquiposService } from 'src/app/services/equipos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reserva-equipos',
  templateUrl: './reserva-equipos.component.html',
  styleUrls: ['./reserva-equipos.component.scss']
})
export class ReservaEquiposComponent implements OnInit {

  itemsParaReservar: EquiposModel[] = [];
  reserva: ReservasModel = new ReservasModel;
  reservaJson: any;

  items: any = [];
  status: string;
  inputVal: string;
  cantidad: number = 1;
  descripcionNecesidad: string = '';
  mostrarCalendario: boolean = true;
  open: boolean = false;
  disabled: boolean = true;
  searchTerm: string = '';
  selectedItem: any = [];

  constructor(private route: Router, private equiposService: EquiposService) { }

  ngOnInit(): void {
    this.equiposService.todosLosEquipos(localStorage.getItem('token') || "[]").subscribe(
      (response: any) => {
        console.log(response.equipos);

        this.items = response.equipos;

      }, error => {
        this.status = 'error';
      })
  }

  toggleDropdown() {
    this.open = !this.open;
    this.searchTerm = '';
  }

  displayItem() {
    let val = this.selectedItem;
    if (val.length === 0) {
      return 'Seleccionar Equipo'
    } else {
      return this.selectedItem.nombre;
    }
  }

  itemClicked(index: any) {
    this.open = false;
    this.selectedItem = this.items[index];
    this.displayItem();
  }

  agregarItemReserva() {
    if (this.selectedItem) {
      console.log(this.itemsParaReservar);

      this.itemsParaReservar.push({
        'id': this.selectedItem['id'],
        'placa': this.selectedItem['placa'],
        'nombre': this.selectedItem['nombre'],
        'cantidad': this.cantidad
      });
    }
    this.selectedItem = '';
  }

  borrarItemReserva(index: number) {
    console.log(index);

    this.itemsParaReservar.splice(index, 1)
  }

  cancelar() {
    Swal.fire({
      title: '¿Está seguro que desea cancelar?',
      text: "Será redirigido al menú principal",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#009045',
      confirmButtonText: 'Confirmar',
      cancelButtonColor: '#d33',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.route.navigate(['/dashboard']);
      }
    })
  }

  agregarCatidad(index: number) {
    console.log(this.cantidad);
    this.itemsParaReservar[index].cantidad = this.cantidad
    console.log(this.itemsParaReservar);
    this.cantidad = 1
  }

  siguiente() {
    if (this.reservaJson) {
      this.mostrarCalendario = !this.mostrarCalendario
    } else {
      Swal.fire({
        title: 'Atención',
        text: 'No se ha seleccionado fecha ni hora',
        icon: 'warning',
        confirmButtonColor: '#009045'
      })
    }
  }

  hacerReserva() {
    if (this.itemsParaReservar.length !== 0 && this.descripcionNecesidad !== '') {
      this.reserva.items = this.itemsParaReservar;
      this.reserva.fechaInicio = this.reservaJson[0].start;
      this.reserva.fechaFin = this.reservaJson[0].end;
      this.reserva.descripcionNecesidad = this.descripcionNecesidad
      console.log(this.reserva);
    } else {
      Swal.fire({
        title: 'Atención',
        text: 'No se ha agregado equipo(s) o la descripción de la necesidad',
        icon: 'warning',
        confirmButtonColor: '#009045'
      })
    }


  }

  obtenerHora(e: any) {
    this.reservaJson = JSON.parse(e);
  }

}
