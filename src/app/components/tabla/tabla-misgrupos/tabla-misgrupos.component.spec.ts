import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaMisgruposComponent } from './tabla-misgrupos.component';

describe('TablaMisgruposComponent', () => {
  let component: TablaMisgruposComponent;
  let fixture: ComponentFixture<TablaMisgruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TablaMisgruposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaMisgruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
