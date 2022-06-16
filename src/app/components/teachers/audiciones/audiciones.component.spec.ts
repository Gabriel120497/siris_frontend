import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AudicionesComponent } from './audiciones.component';

describe('AudicionesComponent', () => {
  let component: AudicionesComponent;
  let fixture: ComponentFixture<AudicionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AudicionesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AudicionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
