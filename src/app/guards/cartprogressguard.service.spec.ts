import { TestBed } from '@angular/core/testing';

import { CartprogressguardService } from './cartprogressguard.service';

describe('CartprogressguardService', () => {
  let service: CartprogressguardService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CartprogressguardService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
