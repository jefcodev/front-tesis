import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompcompraComponent } from './compcompra.component';

describe('CompcompraComponent', () => {
  let component: CompcompraComponent;
  let fixture: ComponentFixture<CompcompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompcompraComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompcompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
