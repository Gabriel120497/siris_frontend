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

  nuevaReserva(token: string, reserva: any) {
    let headers = new HttpHeaders().set('Authorization', token);
    return this.http.post(this.url + 'nuevaReserva', reserva, { headers: headers });
  }

  getReservasAprobadas(token: string) {
    let headers = new HttpHeaders().set('Authorization', token);
    return this.http.get(this.url + 'reservas/reservasAprobadas', { headers: headers });
  }

  getReservasActivas(token: string) {
    let headers = new HttpHeaders().set('Authorization', token);
    return this.http.get(this.url + 'reservas/reservasActivas', { headers: headers });
  }

  getReservaPendientes(token: string) {
    let headers = new HttpHeaders().set('Authorization', token);
    return this.http.get(this.url + 'reservas/reservasPendientes', { headers: headers });
  }

  actualizarReserva(token: string, reserva:any) {
    let headers = new HttpHeaders().set('Authorization', token);
    return this.http.put(this.url + 'activarReserva', reserva, { headers: headers });
  }

}
