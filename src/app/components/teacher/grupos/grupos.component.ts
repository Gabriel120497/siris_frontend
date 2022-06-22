import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-grupos',
  templateUrl: './grupos.component.html',
  styleUrls: ['../../../css/dashboardCarousel.component.css']
})
export class GruposComponent implements OnInit {

  slides: any[] = [
    { nombre: 'Audiciones', modulo: 'Audiciones' },
    { nombre: 'Mis Grupos', modulo: 'MisGrupos' }
  ];

  constructor(private route: Router) { }

  ngOnInit(): void {
  }

  verMas(modulo: string) {
    this.route.navigate(['/teacher/Grupos-de-Proyeccion', modulo]);
  }

}
