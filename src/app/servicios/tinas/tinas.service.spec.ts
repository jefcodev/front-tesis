import { TestBed } from '@angular/core/testing';

import { TinasService } from './tinas.service';

describe('TinasService', () => {
  let service: TinasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TinasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
