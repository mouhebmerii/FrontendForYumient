import { TestBed } from '@angular/core/testing';

import { OrdService } from './ord.service';

describe('OrdService', () => {
  let service: OrdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
