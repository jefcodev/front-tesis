import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComrecicladasComponent } from './comrecicladas.component';

describe('ComrecicladasComponent', () => {
  let component: ComrecicladasComponent;
  let fixture: ComponentFixture<ComrecicladasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComrecicladasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComrecicladasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
