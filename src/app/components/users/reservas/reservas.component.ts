import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservasModel } from 'src/app/models/reservas';
import { InstrumentosService } from 'src/app/services/instrumentos.service';
import { SalonesService } from 'src/app/services/salones.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.scss']
})
export class ReservasComponent implements OnInit {

  modulo: any = this.router.snapshot.paramMap.get('modulo');
  instrument!: string;
  open: boolean = false;
  disabled: boolean = true;
  searchTerm: string = '';
  selectedItem: any = [];
  reserva: ReservasModel = new ReservasModel;
  reservaJson: any;

  items: any = [];
  status: string;

  constructor(private router: ActivatedRoute, private instrumentosService: InstrumentosService,
    private salonesService: SalonesService) { }

  ngOnInit(): void {
    if (this.modulo === 'Salones') {
      this.salonesService.todosLosSalones(localStorage.getItem('token') || "[]").subscribe(
        (response: any) => {
          console.log(response.salones);

          this.items = response.salones;

        }, error => {
          this.status = 'error';
        })
    } else {
      this.instrumentosService.todosLosInstrumentos(localStorage.getItem('token') || "[]").subscribe(
        (response: any) => {
          console.log(response.instrumentos);

          this.items = response.instrumentos;

        }, error => {
          this.status = 'error';
        })
    }

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
      return this.selectedItem.nombre || this.selectedItem.ubicacion;
    }
  }

  itemClicked(index: any) {
    this.open = false;
    this.selectedItem = this.items[index];
    this.displayItem();
  }

  hacerReserva() {
    if (this.selectedItem.length !== 0 && this.reservaJson !== undefined) {
      console.log(this.reservaJson);
      this.reserva.items = this.selectedItem;
      this.reserva.fechaInicio = this.reservaJson[0].start;
      this.reserva.fechaInicio = this.reservaJson[0].end;
      console.log(this.reserva);
    } else {
      Swal.fire({
        title: 'Atención',
        text: `No se a seleccionado ${this.modulo} o fecha`,
        icon: 'warning',
        confirmButtonColor: '#009045'
      })
    }
  }

  obtenerHora(e: any) {
    this.reservaJson = JSON.parse(e)
  }

}
