import { TestBed } from '@angular/core/testing';

import { RecicladasService } from './recicladas.service';

describe('RecicladasService', () => {
  let service: RecicladasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecicladasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
