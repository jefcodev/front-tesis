import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetPedidosComponent } from './det-pedidos.component';

describe('DetPedidosComponent', () => {
  let component: DetPedidosComponent;
  let fixture: ComponentFixture<DetPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetPedidosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
