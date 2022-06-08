import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservaEquiposComponent } from './reserva-equipos.component';

describe('ReservaEquiposComponent', () => {
  let component: ReservaEquiposComponent;
  let fixture: ComponentFixture<ReservaEquiposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservaEquiposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservaEquiposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
