import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GruposProyeccionComponent } from './grupos-proyeccion.component';

describe('GruposProyeccionComponent', () => {
  let component: GruposProyeccionComponent;
  let fixture: ComponentFixture<GruposProyeccionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GruposProyeccionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GruposProyeccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
