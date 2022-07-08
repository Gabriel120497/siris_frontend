import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaReservasActivasComponent } from './tabla-reservas-activas.component';

describe('TablaReservasActivasComponent', () => {
  let component: TablaReservasActivasComponent;
  let fixture: ComponentFixture<TablaReservasActivasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaReservasActivasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaReservasActivasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
