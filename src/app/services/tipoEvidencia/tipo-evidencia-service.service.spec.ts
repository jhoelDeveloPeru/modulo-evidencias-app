import { TestBed } from '@angular/core/testing';

import { TipoEvidenciaServiceService } from './tipo-evidencia-service.service';

describe('TipoEvidenciaServiceService', () => {
  let service: TipoEvidenciaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoEvidenciaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
