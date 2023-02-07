import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompedidosComponent } from './compedidos.component';

describe('CompedidosComponent', () => {
  let component: CompedidosComponent;
  let fixture: ComponentFixture<CompedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompedidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
