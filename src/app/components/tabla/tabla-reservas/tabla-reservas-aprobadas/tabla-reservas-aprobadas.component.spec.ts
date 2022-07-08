import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaReservasAprobadasComponent } from './tabla-reservas-aprobadas.component';

describe('TablaReservasAprobadasComponent', () => {
  let component: TablaReservasAprobadasComponent;
  let fixture: ComponentFixture<TablaReservasAprobadasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaReservasAprobadasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaReservasAprobadasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
