import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarInstrumentosComponent } from './listar-instrumentos.component';

describe('ListarInstrumentosComponent', () => {
  let component: ListarInstrumentosComponent;
  let fixture: ComponentFixture<ListarInstrumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarInstrumentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarInstrumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
