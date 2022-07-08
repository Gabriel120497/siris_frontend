import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaReservasPendientesComponent } from './tabla-reservas-pendientes.component';

describe('TablaReservasPendientesComponent', () => {
  let component: TablaReservasPendientesComponent;
  let fixture: ComponentFixture<TablaReservasPendientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaReservasPendientesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaReservasPendientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
