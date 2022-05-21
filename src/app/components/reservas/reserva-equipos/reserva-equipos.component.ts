import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquiposModel } from 'src/app/models/equipos';
import { ReservaEquiposModel } from "src/app/models/reserva-equipos";

@Component({
  selector: 'app-reserva-equipos',
  templateUrl: './reserva-equipos.component.html',
  styleUrls: ['./reserva-equipos.component.scss']
})
export class ReservaEquiposComponent implements OnInit {

  itemsParaReservar: EquiposModel[] = [];
  reserva: ReservaEquiposModel = new ReservaEquiposModel;
  reservaJson: any;

  items = [{
    'name': 'Item 1', 'id': 1
  }, {
    'name': 'Item 2', 'id': 2
  }, {
    'name': 'Account 3', 'id': 3
  }, {
    'name': 'Account 4', 'id': 4
  }, {
    'name': 'Item 5', 'id': 5
  }, {
    'name': 'Item 6', 'id': 6
  }, {
    'name': 'User 7', 'id': 7
  }, {
    'name': 'User 8', 'id': 8
  }];

  inputVal: string;
  cantidad: number = 0;
  calendario: boolean = true;

  constructor(private route: Router) { }

  ngOnInit(): void {

  }

  agregarItemReserva() {
    if (this.inputVal) {
      console.log(this.itemsParaReservar);

      this.itemsParaReservar.push({
        'id': this.inputVal,
        'nombre': this.items.find(item => { return item.id.toString() === this.inputVal })?.name,
        'cantidad': this.cantidad
      });
    }
    this.inputVal = '';
  }

  borrarItemReserva(index: number) {
    console.log(index);

    this.itemsParaReservar.splice(index, 1)
  }

  agregarCatidad(index: number) {
    console.log(this.cantidad);
    this.itemsParaReservar[index].cantidad = this.cantidad
    console.log(this.itemsParaReservar);
    this.cantidad = 0
  }

  siguiente() {
    this.calendario = !this.calendario
  }

  hacerReserva() {
    this.reserva.id = '1';
    this.reserva.equipos = this.itemsParaReservar;
    this.reserva.fechaInicio = this.reservaJson[0].start;
    this.reserva.fechaFin = this.reservaJson[0].end;
    console.log(this.reserva);

  }

  obtenerHora(e: any) { 
    this.reservaJson = JSON.parse(e);
  }

}
