import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-cursos-grupos',
  templateUrl: './cursos-grupos.component.html',
  styleUrls: ['./cursos-grupos.component.css']
})
export class CursosGruposComponent implements OnInit {

  constructor(private router:ActivatedRoute, private route:Router) { }
  
  modulo: any=this.router.snapshot.paramMap.get('modulo');
  
  ngOnInit(): void {
  }

}
