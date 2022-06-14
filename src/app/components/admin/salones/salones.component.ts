import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-salones',
  templateUrl: './salones.component.html',
  styleUrls: ['./salones.component.css']
})
export class SalonesComponent implements OnInit {

  constructor(private router:ActivatedRoute, private route:Router) { }
  
  modulo: any=this.router.snapshot.paramMap.get('modulo');

  ngOnInit(): void {
  }

}
