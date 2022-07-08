import { Component, OnInit, ViewChild, ElementRef, LOCALE_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReservasModel } from 'src/app/models/reservas';
import { InstrumentosService } from 'src/app/services/instrumentos.service';
import { ReservasService } from 'src/app/services/reservas.service';
import { SalonesService } from 'src/app/services/salones.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { DatePipe } from '@angular/common';
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
  reserva: any = {};
  reservaJson: any;

  items: any = [];
  status: string;
  show: boolean = false;
  cargando: boolean = false;

  constructor(private router: ActivatedRoute, private instrumentosService: InstrumentosService,
    private salonesService: SalonesService, private reservasServices: ReservasService, private route: Router,
    private usuariosService: UsuariosService) { }

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
      return this.selectedItem.nombre || this.selectedItem.ubicacion;
    }
  }

  itemClicked(index: any) {
    this.open = false;
    this.selectedItem = this.items[index];
    this.displayItem();
  }

  hacerReserva() {
    this.cargando = true;
    if (this.selectedItem.length !== 0 && this.reservaJson !== undefined) {
      this.reserva.id_usuario = this.usuariosService.getId();
      this.reserva.estado = 'aprobada';
      this.reserva.item = this.selectedItem.nombre || this.selectedItem.ubicacion;
      this.reserva.tipo_item = this.modulo;
      this.reserva.fecha_inicio = this.reservaJson.fecha_inicio;
      this.reserva.fecha_fin = this.reservaJson.fecha_fin;
      this.reserva.correo = this.usuariosService.getCorreo();
      this.reservasServices.nuevaReserva(this.usuariosService.getToken(), this.reserva).subscribe(
        (response: any) => {
          this.cargando = false;
          Swal.fire({
            title: 'Éxitoso',
            text: `Se ha creado la reserva con código ${response.reserva.id} de manera exitosa`,
            icon: 'success',
            confirmButtonColor: '#009045'
          }).then((result) => {
            if (result.isConfirmed) {
              this.route.navigate(['dashboard']);
            }
          })

        }, error => {
          this.status = 'error';
        });
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
    let pipe = new DatePipe('en-US');

    this.reservaJson = {
      'fecha_inicio': pipe.transform(JSON.parse(e)[0].start, 'dd-MM-yyyy HH:mm:ss'),
      'fecha_fin': pipe.transform(JSON.parse(e)[0].end, 'dd-MM-yyyy HH:mm:ss')
    }

    this.show = true; this.cargando = true;
    if (this.modulo === 'Salones') {
      this.salonesService.getSalones(this.usuariosService.getToken()).subscribe(
        (response: any) => {

          this.items = response.salones;
          this.cargando = false;

        }, error => {
          this.status = 'error';
        })
    } else {
      this.instrumentosService.getInstrumentosDisponibles(this.usuariosService.getToken()).subscribe(
        (response: any) => {

          this.items = response.instrumentos;
          this.cargando = false;

        }, error => {
          this.status = 'error';
          this.cargando = false;
          Swal.fire({
            title: 'Atención',
            text: `No se pudieron obtener los instrumentos.\nIntentlo mas tarde`,
            icon: 'error',
            confirmButtonColor: '#009045'
          })
        });
    }

  }

}