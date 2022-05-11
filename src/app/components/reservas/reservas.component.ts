import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styleUrls: ['./reservas.component.css']
})
export class ReservasComponent implements OnInit {

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

}
