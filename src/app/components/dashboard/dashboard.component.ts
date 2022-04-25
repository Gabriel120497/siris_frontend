import { Component, OnInit } from '@angular/core';
import { fromEvent, Observable, Subscription } from "rxjs";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  slider: any[] = [];
  slides: any[] = [
    { name: 'LIME', 'background-color': "#a4c400" },
    { name: 'GREEN', 'background-color': "#60a917" },
    { name: 'EMERALD', 'background-color': "#008a00" },
    { name: 'TEAL', 'background-color': "#00aba9" },
    { name: 'CIAN', 'background-color': "#1ba1e2" },
    { name: 'COBALT', 'background-color': "#0050ef" },
    { name: 'INDIGO', 'background-color': "#6a00ff" },
    { name: 'VIOLET', 'background-color': "#aa00ff" }
  ];

  start: number = 0;
  setSlidesVar: number = 0;


  constructor() { }

  ngOnInit(): void {
    this.setSlides(screen.width);
  }

  moveLeft() {
    this.start = this.start + 1;
    this.setSlidesVar = this.setSlidesVar + 1;
    console.log('left');

  }

  moveRight() {
    this.start = this.start - 1;
    this.setSlidesVar = this.setSlidesVar - 1;
    console.log('right');
  }

  onResize(event: any) {
    console.log(event.srcElement.innerWidth);
    this.setSlides(event.srcElement.innerWidth);
    //this.setSlides(event.)
  }

  setSlides(value: number) {
    console.log(value);

    if (value < 500) { this.setSlidesVar = 1; }
    else if (value >= 500 && value < 1000) { this.setSlidesVar = 2; }
    else if (value >= 1000 && value < 1600) { this.setSlidesVar = 3; }
    else {
      this.setSlidesVar = 4
    }
  }

}
