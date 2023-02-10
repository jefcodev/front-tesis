import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetDespachoComponent } from './det-despacho.component';

describe('DetDespachoComponent', () => {
  let component: DetDespachoComponent;
  let fixture: ComponentFixture<DetDespachoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetDespachoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetDespachoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
