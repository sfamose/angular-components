import { TestBed } from '@angular/core/testing';

import { ExportCsvService } from './export-csv.service';

describe('ExportCsvService', () => {
  let service: ExportCsvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExportCsvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
