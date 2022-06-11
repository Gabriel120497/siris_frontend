import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.css']
})
export class TablaComponent implements OnInit {

  constructor(private router:ActivatedRoute, private route:Router) { }

  modulo: any=this.router.snapshot.paramMap.get('modulo');

  ngOnInit(): void {
  }

  redirigir(){
    this.route.navigate([`admin/agregar/${this.modulo}`]);
    
  }

}
