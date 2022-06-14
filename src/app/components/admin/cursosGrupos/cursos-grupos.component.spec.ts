import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CursosGruposComponent } from './cursos-grupos.component';

describe('CursosGruposComponent', () => {
  let component: CursosGruposComponent;
  let fixture: ComponentFixture<CursosGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CursosGruposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CursosGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
