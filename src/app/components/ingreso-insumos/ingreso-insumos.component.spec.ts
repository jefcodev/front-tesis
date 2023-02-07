import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresoInsumosComponent } from './ingreso-insumos.component';

describe('IngresoInsumosComponent', () => {
  let component: IngresoInsumosComponent;
  let fixture: ComponentFixture<IngresoInsumosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IngresoInsumosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IngresoInsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
