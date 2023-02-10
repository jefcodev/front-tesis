import { TestBed } from '@angular/core/testing';

import { ModalpedidoService } from './modalpedido.service';

describe('ModalpedidoService', () => {
  let service: ModalpedidoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModalpedidoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
