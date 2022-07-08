import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

import { global } from "./global";
import { UsuariosModel } from '../models/usuario';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private url: string
  identity: string | null;
  token: string;
  rol: string;
  sub: string;
  nombre: string;
  correo: string;
  constructor(public http: HttpClient) {
    this.url = global.url;
  }

  login(usuario: any, gettoken?: boolean | null): Observable<any> {
    if (gettoken != null) {
      usuario.gettoken = true;
    }
    let json = JSON.stringify(usuario);
    let params = json;
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this.http.post(this.url + 'login', params, { headers: headers });
  }

  getRol() {
    let identity = JSON.parse(localStorage.getItem('identity') || "[]");
    if (identity && (identity != undefined || identity != 'undefined')) {
      this.rol = identity.rol;
    } else {
      this.rol = '';
    }
    return this.rol;
  }

  getId() {
    let identity = JSON.parse(localStorage.getItem('identity') || '');
    if (identity && (identity != undefined || identity != 'undefined')) {
      this.sub = identity.sub;
    } else {
      this.sub = '';
    }
    return this.sub;
  }

  getNombre() {
    let identity = JSON.parse(localStorage.getItem('identity') || '');
    if (identity && (identity != undefined || identity != 'undefined')) {
      this.nombre = identity.nombre;
    } else {
      this.nombre = '';
    }
    return this.nombre;
  }

  getCorreo() {
    let identity = JSON.parse(localStorage.getItem('identity') || '');
    if (identity && (identity != undefined || identity != 'undefined')) {
      this.correo = identity.correo;
    } else {
      this.correo = '';
    }
    return this.correo;
  }


  getIdentity() {
    let identity = JSON.parse(localStorage.getItem('identity') || '');
    if (identity && (identity != undefined || identity != 'undefined')) {
      this.identity = identity;
    } else {
      this.identity = null;
    }
    return this.identity;
  }

  getToken() {
    let token = localStorage.getItem('token') || '';
    if (token && (token != undefined || token != 'undefined')) {
      this.token = token;
    } else {
      this.token = '';
    }
    return this.token;
  }

  profesores(token: string | []) {
    let headers = new HttpHeaders().set('Authorization', token);
    return this.http.get(this.url + 'usuario/profesores', { headers: headers });
  }

  nuevoUsuario(usuario: any, token: string) {
    let headers = new HttpHeaders().set('Authorization', token);
    return this.http.post(this.url + 'usuario/nuevoUsuario', usuario, { headers: headers });
  }
}
