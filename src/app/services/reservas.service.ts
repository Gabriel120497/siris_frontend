import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { global } from "./global";

@Injectable({
  providedIn: 'root'
})
export class ReservasService {
  private url: string

  constructor(public http: HttpClient) {
    this.url = global.url;
  }

  nuevaReserva(token: string|[], reserva:any){
    console.log('hola');
    
    let headers = new HttpHeaders().set('Authorization', token);
    return this.http.post(this.url + 'reservas/nueva', reserva,{ headers: headers });
  }
}
