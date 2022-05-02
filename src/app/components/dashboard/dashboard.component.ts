import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  slider: any[] = [];
  slides: any[] = [
    { tipoReserva: 'LIME', 'background-color': "#a4c400" },
    { tipoReserva: 'GREEN', 'background-color': "#60a917" },
    { tipoReserva: 'EMERALD', 'background-color': "#008a00" },
    { tipoReserva: 'TEAL', 'background-color': "#00aba9" },
    { tipoReserva: 'CIAN', 'background-color': "#1ba1e2" },
    { tipoReserva: 'COBALT', 'background-color': "#0050ef" },
    { tipoReserva: 'INDIGO', 'background-color': "#6a00ff" },
    { tipoReserva: 'VIOLET', 'background-color': "#aa00ff" }
  ];

  start: number = 0;
  setSlidesVar: number = 0;

  constructor(private route:Router) { }

  ngOnInit(): void {
    this.setSlides(screen.width);
  }

  moveLeft() {
    this.start = this.start - 1;
    this.setSlidesVar = this.setSlidesVar - 1;
    console.log('left');

  }

  moveRight() {
    this.start = this.start + 1;
    this.setSlidesVar = this.setSlidesVar + 1;
    console.log('right');
  }

  onResize(event: any) {
    console.log(event.srcElement.innerWidth);
    this.setSlides(event.srcElement.innerWidth);
    //this.setSlides(event.)
  }

  setSlides(value: number) {
    console.log(value);

    if (value < 700) { this.setSlidesVar = 1; }
    else if (value >= 700 && value < 1300) { this.setSlidesVar = 2; }
    else if (value >= 1300 && value < 1600) { this.setSlidesVar = 3; }
    else {
      this.setSlidesVar = 4
    }
  }

  reservas(tipoReserva: string) {
    this.route.navigate(['/reservas', tipoReserva]);
  }

}
