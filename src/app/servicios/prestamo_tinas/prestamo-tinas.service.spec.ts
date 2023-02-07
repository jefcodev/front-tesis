import { TestBed } from '@angular/core/testing';

import { PrestamoTinasService } from './prestamo-tinas.service';

describe('PrestamoTinasService', () => {
  let service: PrestamoTinasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PrestamoTinasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
