import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-clases-grupos',
  templateUrl: './clases-grupos.component.html',
  styleUrls: ['./clases-grupos.component.css']
})
export class ClasesGruposComponent implements OnInit {

  constructor(private router:ActivatedRoute, private route:Router) { }
  
  modulo: any=this.router.snapshot.paramMap.get('modulo');
  
  ngOnInit(): void {
  }

}
