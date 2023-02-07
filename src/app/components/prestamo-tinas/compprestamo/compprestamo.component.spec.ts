import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompprestamoComponent } from './compprestamo.component';

describe('CompprestamoComponent', () => {
  let component: CompprestamoComponent;
  let fixture: ComponentFixture<CompprestamoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompprestamoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompprestamoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
