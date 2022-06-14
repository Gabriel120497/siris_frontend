import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClasesGruposComponent } from './clases-grupos.component';

describe('ClasesGruposComponent', () => {
  let component: ClasesGruposComponent;
  let fixture: ComponentFixture<ClasesGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClasesGruposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ClasesGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
