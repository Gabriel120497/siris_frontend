import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GruposService } from 'src/app/services/grupos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla-misgrupos',
  templateUrl: './tabla-misgrupos.component.html',
  styleUrls: ['../../../css/tabla.component.css']
})
export class TablaMisgruposComponent implements OnInit {

  verdeBtn: string = "bi bi-pencil";
  rojoBtn: string = "bi bi-trash";
  headerTabla: string[] = ['Código', 'Nombre', 'Descripción', 'Pre-Requisitos', 'Cupos Totales', 'Cupos Disponibles', 'Horario', 'Lugar'];
  headerTablaEstudiantes: string[] = ['Documento', 'Nombre', 'Celular', 'Correo'];
  mis_grupos: any[];
  estudiantes: any[];

  constructor(private gruposService: GruposService, private usuariosService: UsuariosService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.getMisGrupos();
  }

  getMisGrupos() {
    this.gruposService.getMisGrupos(this.usuariosService.getNombre(),
      this.usuariosService.getToken()).subscribe(
        (response: any) => {
          this.mis_grupos = response.grupos;
        }, error => {
          Swal.fire({
            title: 'Audiciones',
            text: error.error.message,
            icon: 'warning',
            confirmButtonColor: '#009045',
            confirmButtonText: 'Confirmar'
          })
        });
  }

  getEstudiantes(index: number, modal: any) {
    this.gruposService.getEstudiantes(this.usuariosService.getToken(), this.mis_grupos[index].id).subscribe(
      (response: any) => {
        this.estudiantes = response.estudiantes
        this.modalService.open(modal, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {

        }, (reason) => {
        });
      }, error => {
        Swal.fire({
          title: 'Importante',
          text: error.error.message,
          icon: 'warning',
          confirmButtonColor: '#009045',
          confirmButtonText: 'Confirmar'
        }).then((result) => {
          if (result.isConfirmed) {
            //this.getGrupos();
          }
        })
      });

    
  }

}
