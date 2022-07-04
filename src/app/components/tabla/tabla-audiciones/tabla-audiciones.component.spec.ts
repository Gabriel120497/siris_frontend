import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaAudicionesComponent } from './tabla-audiciones.component';

describe('TablaAudicionesComponent', () => {
  let component: TablaAudicionesComponent;
  let fixture: ComponentFixture<TablaAudicionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaAudicionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaAudicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
