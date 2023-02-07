import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecicladasComponent } from './recicladas.component';

describe('RecicladasComponent', () => {
  let component: RecicladasComponent;
  let fixture: ComponentFixture<RecicladasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecicladasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecicladasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
