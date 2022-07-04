import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { global } from "./global";

@Injectable({
  providedIn: 'root'
})
export class InstrumentosService {

  private url: string

  constructor(public http: HttpClient) {
    this.url = global.url;
  }

  getInstrumentosDisponibles(token: string|[]){
    let headers = new HttpHeaders().set('Authorization', token);
    return this.http.get(this.url + 'instrumentosDisponibles', { headers: headers });
  }

  getInstrumentos(token: string|[]){
    let headers = new HttpHeaders().set('Authorization', token);
    return this.http.get(this.url + 'instrumentos', { headers: headers });
  }

  deshabilitarInstrumento(token: string|[], instrumento:any){
    let headers = new HttpHeaders().set('Authorization', token);
    return this.http.put(this.url + 'deshabilitarInstrumento', instrumento, { headers: headers });
  }

  nuevoInstrumento(token: string|[], instrumento:any){
    let headers = new HttpHeaders().set('Authorization', token);
    return this.http.post(this.url + 'nuevoInstrumento', instrumento, { headers: headers });
  }

}
