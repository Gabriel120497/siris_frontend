import { Component, OnInit, AfterContentInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as $ from 'jquery';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit, AfterContentInit {

  constructor(private router: ActivatedRoute) { }

  tipoReserva: any = this.router.snapshot.paramMap.get('tipoReserva');
  instrument!: string;

  items = [{
    'name': 'Item 1'
  }, {
    'name': 'Item 2'
  }, {
    'name': 'Account 3'
  }, {
    'name': 'Account 4'
  }, {
    'name': 'Item 5'
  }, {
    'name': 'Item 6'
  }, {
    'name': 'User 7'
  }, {
    'name': 'User 8'
  }];

  ngOnInit(): void {

  }

  ngAfterContentInit(): void {
    /*($('.dropdown') as any).dropdown({
      constrainWidth:false,
      label: {
        duration: 0,
      },
      debug: true,
      performance: true,
    });*/
  }

}
