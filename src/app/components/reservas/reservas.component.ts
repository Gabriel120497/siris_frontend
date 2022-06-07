import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservaEquiposModel } from 'src/app/models/reserva-equipos';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

  constructor(private router: ActivatedRoute) { }

  tipoReserva: any = this.router.snapshot.paramMap.get('tipoReserva');
  instrument!: string;
  open: boolean = false;
  searchTerm: string = '';
  selectedItem: any = [];
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

  ngOnInit(): void {

  }

  toggleDropdown() {
    this.open = !this.open;
    this.searchTerm = '';
  }

  displayItem() {
    let val = this.selectedItem;
    if (val.length === 0) {
      return 'Search and Select'
    } else {
      return this.selectedItem.field;
    }

  }
  itemClicked(index: any) {
    this.open = false;
    this.selectedItem = this.items[index];
    this.displayItem();
  }

  hacerReserva(){
    if (this.selectedItem.length !== 0 && this.reservaJson !== undefined) {
      console.log(this.reservaJson);

      this.reserva.id = '1';
      this.reserva.equipos = this.selectedItem;
      this.reserva.fechaInicio = this.reservaJson[0].start;
      this.reserva.fechaInicio = this.reservaJson[0].end;
      console.log(this.reserva);   
    }
  }

  obtenerHora(e :any) {
    this.reservaJson = JSON.parse(e)
  }

}
