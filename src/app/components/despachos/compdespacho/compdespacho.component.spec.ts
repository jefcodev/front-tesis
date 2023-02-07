import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompdespachoComponent } from './compdespacho.component';

describe('CompdespachoComponent', () => {
  let component: CompdespachoComponent;
  let fixture: ComponentFixture<CompdespachoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompdespachoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompdespachoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
