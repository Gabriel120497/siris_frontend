import { Component, OnInit } from '@angular/core';
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
  mis_grupos: any[];

  constructor(private gruposService: GruposService, private usuariosService: UsuariosService) { }

  ngOnInit(): void {
    this.getMisGrupos();
  }

  getMisGrupos() {
    this.gruposService.getMisGrupos(this.usuariosService.getNombre(),
      this.usuariosService.getToken()).subscribe(
        (response: any) => {
          console.log(response.grupos);
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

}
