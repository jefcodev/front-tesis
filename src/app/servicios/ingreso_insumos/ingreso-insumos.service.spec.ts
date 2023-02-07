import { TestBed } from '@angular/core/testing';

import { IngresoInsumosService } from './ingreso-insumos.service';

describe('IngresoInsumosService', () => {
  let service: IngresoInsumosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngresoInsumosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
