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

  nuevoGrupo(grupo:any, token: string|[]){
    let headers = new HttpHeaders().set('Authorization', token);

    return this.http.post(this.url + 'nuevoGrupo', grupo, { headers: headers });
  }

  grupos(){
    return this.http.get(this.url+'grupos');
  }
}
