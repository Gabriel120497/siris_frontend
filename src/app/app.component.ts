import { Component } from '@angular/core';
import { UsuariosService } from './services/usuarios.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'SIRIS';
  /*identity: string | null;
  token: string;

  constructor(public usuariosService: UsuariosService) {
    this.identity = this.usuariosService.getIdentity();
  }*/


}
