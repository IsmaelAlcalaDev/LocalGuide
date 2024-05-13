import { TestBed } from '@angular/core/testing';

import { TuristaService } from './turista.service';

describe('TuristaService', () => {
  let service: TuristaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TuristaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
