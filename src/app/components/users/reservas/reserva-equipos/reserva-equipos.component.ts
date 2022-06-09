import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EquiposModel } from 'src/app/models/equipos';
import { ReservaEquiposModel } from "src/app/models/reserva-equipos";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reserva-equipos',
  templateUrl: './reserva-equipos.component.html',
  styleUrls: ['./reserva-equipos.component.scss']
})
export class ReservaEquiposComponent implements OnInit {

  itemsParaReservar: EquiposModel[] = [];
  reserva: ReservaEquiposModel = new ReservaEquiposModel;
  reservaJson: any;

  items =
    [
      { value: "1", field: "Teacher" },
      { value: "2", field: "Technician" },
      { value: "3", field: "Physician" },
      { value: "4", field: "Engineering Technologist" },
      { value: "5", field: "Mechanic" },
      { value: "6", field: "Tradesman" },
      { value: "7", field: "Electrician" },
      { value: "8", field: "Machinist" },
      { value: "9", field: "Radiographer" },
      { value: "10", field: "Programmer" },
      { value: "11", field: "Actuary" },
      { value: "12", field: "Plumber" },
      { value: "13", field: "Surveyor" },
      { value: "14", field: "Welder" },
      { value: "15", field: "Consultant" },
      { value: "16", field: "Auto Mechanic" },
      { value: "17", field: "Tailor" },
      { value: "18", field: "Journalist" },
      { value: "19", field: "Broker" },
      { value: "20", field: "Lawyer" },
      { value: "21", field: "Judge" },
      { value: "22", field: "Barrister" },
      { value: "23", field: "Solicitor" },
      { value: "24", field: "Paramedic" },
      { value: "25", field: "Dental Technician" },
      { value: "26", field: "Quantity Surveyor" },
      { value: "27", field: "Tailor" },
      { value: "28", field: "Nurse" },
      { value: "30", field: "Pharmacist" },
      { value: "31", field: "Hairdresser" },
      { value: "32", field: "Anesthesiology" },
      { value: "33", field: "Engineer" },
      { value: "34", field: "Actuary" },
      { value: "35", field: "Electrician" },
      { value: "36", field: "Machinist" },
      { value: "37", field: "Tradesman" },
      { value: "38", field: "Drafter" },
      { value: "39", field: "Chef" },
      { value: "40", field: "Bricklayer" }
    ];

  inputVal: string;
  cantidad: number = 1;
  descripcionNecesidad:string = '';
  mostrarCalendario: boolean = true;
  open: boolean = false;
  disabled: boolean = true;
  searchTerm: string = '';
  selectedItem: any = [];

  constructor(private route: Router) { }

  ngOnInit(): void {

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
      return this.selectedItem.field;
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
        'id': this.selectedItem['value'],
        'nombre': this.selectedItem['field'],
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
      title: 'Está seguro que desea cancelar?',
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
    this.cantidad = 0
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
      this.reserva.id = '1';
      this.reserva.equipos = this.itemsParaReservar;
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
