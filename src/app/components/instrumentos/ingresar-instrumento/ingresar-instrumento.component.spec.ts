import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarInstrumentoComponent } from './ingresar-instrumento.component';

describe('IngresarInstrumentoComponent', () => {
  let component: IngresarInstrumentoComponent;
  let fixture: ComponentFixture<IngresarInstrumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresarInstrumentoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresarInstrumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
