import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrestamoTinasComponent } from './prestamo-tinas.component';

describe('PrestamoTinasComponent', () => {
  let component: PrestamoTinasComponent;
  let fixture: ComponentFixture<PrestamoTinasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrestamoTinasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PrestamoTinasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
