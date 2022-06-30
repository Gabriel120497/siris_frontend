import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaInstrumentosComponent } from './tabla-instrumentos.component';

describe('TablaInstrumentosComponent', () => {
  let component: TablaInstrumentosComponent;
  let fixture: ComponentFixture<TablaInstrumentosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaInstrumentosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaInstrumentosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
