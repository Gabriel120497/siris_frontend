import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { global } from "./global";

@Injectable({
  providedIn: 'root'
})
export class GruposService {
  private url: string

  constructor(public http: HttpClient) {
    this.url = global.url;
  }

  nuevoGrupo(grupo: any, token: string | []) {
    let headers = new HttpHeaders().set('Authorization', token);
    return this.http.post(this.url + 'nuevoGrupo', grupo, { headers: headers });
  }

  grupos() {
    let headers = new HttpHeaders().set('Authorization', '');
    return this.http.get(this.url + 'grupos', { headers: headers });
  }

  getAudicionesPendientes(profesor: any, token: string) {
    console.log(profesor);
    let headers = new HttpHeaders().set('Authorization', token);
    return this.http.post(this.url + `audicionesPendientes`, profesor, { headers: headers });
  }

  getMisGrupos(profesor: string, token: string){
    console.log('profesor: ', profesor);
    
    let headers = new HttpHeaders().set('Authorization', token);
    return this.http.get(this.url + `misGrupos/${profesor}`, { headers: headers });
  }

  eliminarGrupo(id:number, token:string){
    let headers = new HttpHeaders().set('Authorization', token);
    return this.http.delete(this.url + `eliminarGrupo/${id}`, { headers: headers });
  }

  actualizarGrupo(token: string, grupo:any){
    let headers = new HttpHeaders().set('Authorization', token);
    return this.http.put(this.url + 'actualizarGrupo', grupo, { headers: headers });
  }
}
