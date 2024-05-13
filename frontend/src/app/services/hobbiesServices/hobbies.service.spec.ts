import { TestBed } from '@angular/core/testing';

import { HobbiesService } from './hobbies.service';

describe('HobbiesService', () => {
  let service: HobbiesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HobbiesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
