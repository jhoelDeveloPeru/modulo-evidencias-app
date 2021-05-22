import { TestBed } from '@angular/core/testing';

import { EvidenciaServiceService } from './evidencia-service.service';

describe('EvidenciaServiceService', () => {
  let service: EvidenciaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EvidenciaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
