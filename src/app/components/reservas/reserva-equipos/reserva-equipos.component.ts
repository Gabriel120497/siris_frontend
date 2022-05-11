import { Component, OnInit } from '@angular/core';
import { EquiposModel } from 'src/app/models/equipos';

@Component({
  selector: 'app-reserva-equipos',
  templateUrl: './reserva-equipos.component.html',
  styleUrls: ['./reserva-equipos.component.scss']
})
export class ReservaEquiposComponent implements OnInit {

  itemsParaReservar: EquiposModel[] = [];

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

  constructor() { }

  ngOnInit(): void {

  }

  agregarItemReserva() {
    if (this.inputVal) {
      this.itemsParaReservar.push({
        'id': '8',
        'nombre': this.inputVal
      });
    }
    this.inputVal = '';
  }

  borrarItemReserva(index: number) {
    console.log(index);

    this.itemsParaReservar.splice(index, 1)
  }

}
