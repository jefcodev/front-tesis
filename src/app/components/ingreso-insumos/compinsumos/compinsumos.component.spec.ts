import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompinsumosComponent } from './compinsumos.component';

describe('CompinsumosComponent', () => {
  let component: CompinsumosComponent;
  let fixture: ComponentFixture<CompinsumosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompinsumosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CompinsumosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
