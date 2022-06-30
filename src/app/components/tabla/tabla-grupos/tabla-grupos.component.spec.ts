import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaGruposComponent } from './tabla-grupos.component';

describe('TablaGruposComponent', () => {
  let component: TablaGruposComponent;
  let fixture: ComponentFixture<TablaGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaGruposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
