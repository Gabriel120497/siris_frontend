import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UsuariosModel } from 'src/app/models/usuario';
import { UsuariosService } from 'src/app/services/usuarios.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./css/login.component.css', './css/util.component.css'],
  providers: [UsuariosService]
})
export class LoginComponent implements OnInit {

  constructor(private route: Router, private activatedRouter: ActivatedRoute, private usuarioService: UsuariosService) { }

  loginForm: any;
  usuarioRequest: UsuariosModel = new UsuariosModel;
  status: string;
  token: any;
  identity: string | null;

  ngOnInit(): void {
    this.logout();
    this.loginForm = new FormGroup({
      usuario: new FormControl('', Validators.required),
      clave: new FormControl('', Validators.required)
    })
  }

  login(): void {
    this.usuarioRequest.correo = this.loginForm.value.usuario;
    this.usuarioRequest.clave = this.loginForm.value.clave;
    this.usuarioService.login(this.usuarioRequest).subscribe(
      response => {
        if (response.status != 'error') {
          this.status = 'success';
          this.token = response;

          this.usuarioService.login(this.usuarioRequest, true).subscribe(
            response => {

              this.identity = response;
              //Peristir datos del usuario
              localStorage.setItem('token', this.token);
              localStorage.setItem('identity', JSON.stringify(this.identity));
              if (this.usuarioService.getRol() != 'Externo') {
                this.route.navigate(['/dashboard']);
              } else {
                this.route.navigate(['/Grupos-de-Proyeccion']);
              }

            }, error => {
              this.status = 'error';
            }
          )

        } else {
          this.status = 'error';
        }

      }, error => {
        this.status = 'error';
      }
    )
  }

  logout() {
    this.activatedRouter.params.subscribe(params => {
      let logout = +params['sure'];
      if (logout == 1) {
        localStorage.removeItem('identity');
        localStorage.removeItem('token');
        this.identity = null;
        this.token = null;

        this.route.navigate(['login']);
      }
    });
  }

  get usuario() { return this.loginForm.get('usuario'); }
  get clave() { return this.loginForm.get('clave'); }

}
