import { TestBed } from '@angular/core/testing';

import { RickService } from './rick.service';

describe('RickService', () => {
  let service: RickService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RickService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
