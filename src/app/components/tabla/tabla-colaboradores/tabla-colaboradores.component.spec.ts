import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaColaboradoresComponent } from './tabla-colaboradores.component';

describe('TablaColaboradoresComponent', () => {
  let component: TablaColaboradoresComponent;
  let fixture: ComponentFixture<TablaColaboradoresComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaColaboradoresComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaColaboradoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
