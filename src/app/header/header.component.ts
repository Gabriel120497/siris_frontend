import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { UsuariosService } from '../services/usuarios.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private router: ActivatedRoute, private route: Router, private usuariosService: UsuariosService) { }

  admin: boolean;
  colaborador: boolean;
  profesor: boolean;

  ngOnInit(): void {
    let rol = this.usuariosService.getRol();
    switch (rol) {
      case 'Admin':
        this.admin = true;
        this.colaborador = false;
        this.profesor = false;
        break;
        case 'Colaborador':
        this.admin = false;
        this.colaborador = true;
        this.profesor = false;
        break;
        case 'Profesor':
        this.admin = false;
        this.colaborador = false;
        this.profesor = true;
        break;

      default:
        break;
    }
  }

  redirigir(){
    if (this.usuariosService.identity == null) {
      this.route.navigate(['/login']);
    } else {
      this.route.navigate(['/dashboard']);
      
    }
  }

}
