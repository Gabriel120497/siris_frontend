import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { GruposService } from 'src/app/services/grupos.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla-grupos.component.html',
  styleUrls: ['../../../css/tabla.component.css']
})
export class TablaGruposComponent implements OnInit {

  constructor(private route: Router, private gruposService: GruposService, private usuariosService: UsuariosService) { }

  headerTabla: string[] = ['Nombre', 'Descripción', 'Profesor', 'Cupos Totales', 'Cupos Disponibles', 'Horario'];
  grupos: any[];
  verdeBtn: string = "bi bi-pencil";
  rojoBtn: string = "bi bi-trash";

  ngOnInit(): void {
    this.getGrupos();
  }

  redirigir() {
    this.route.navigate([`/admin/agregar/Grupos-de-Proyeccion`]);
  }

  getGrupos() {
    this.gruposService.grupos().subscribe(
      (response: any) => {
        console.log(response.grupos);
        this.grupos = response.grupos;
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

  eliminarGrupo(index: number) {
    console.log(this.grupos[index].id);
    this.gruposService.eliminarGrupo(this.grupos[index].id, this.usuariosService.getToken()).subscribe(
      (response: any) => {
        console.log(response.grupo);
        Swal.fire({
          title: 'Éxito',
          text: `El grupo ${response.grupo.nombre} ha sido eliminado`,
          icon: 'success',
          confirmButtonColor: '#009045',
          confirmButtonText: 'Confirmar'
        })
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
