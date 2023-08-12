import { TestBed } from '@angular/core/testing';

import { RtVirtualScrollService } from './rt-virtual-scroll.service';

describe('RtVirtualScrollService', () => {
  let service: RtVirtualScrollService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RtVirtualScrollService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
