import { TestBed } from '@angular/core/testing';

import { AficionesService } from './aficiones.service';

describe('AficionesService', () => {
  let service: AficionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AficionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
