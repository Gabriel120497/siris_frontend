import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./css/login.component.css', './css/util.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private route:Router) { }

  loginForm: any;

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      usuario: new FormControl('', Validators.required),
      clave: new FormControl('', Validators.required)
    })
  }

  login(): void {
    console.log(this.loginForm.value.usuario);
    console.log(this.loginForm.value.clave);
    this.route.navigate(['/dashboard']);
  }

  get usuario() { return this.loginForm.get('usuario'); }
  get clave() { return this.loginForm.get('clave'); }

}
