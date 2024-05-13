import { TestBed } from '@angular/core/testing';

import { GuiaService } from './guia.service';

describe('GuiaService', () => {
  let service: GuiaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GuiaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
