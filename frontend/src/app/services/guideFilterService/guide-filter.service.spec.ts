import { TestBed } from '@angular/core/testing';

import { GuideFilterService } from './guide-filter.service';

describe('GuideFilterService', () => {
  let service: GuideFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuideFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
