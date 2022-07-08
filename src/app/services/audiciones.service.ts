import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { global } from "./global";

@Injectable({
  providedIn: 'root'
})
export class AudicionesService {

  private url: string

  constructor(public http: HttpClient) {
    this.url = global.url;
  }
  nuevaAudicion(aspirante: any) {
    //let headers = new HttpHeaders().set('Authorization', token);
    return this.http.post(this.url + 'nuevaAudicion', aspirante);
  }

  actualizarAudicion(audicion: any) {
    return this.http.put(this.url + 'actualizarAudicion', audicion);
  }

}
