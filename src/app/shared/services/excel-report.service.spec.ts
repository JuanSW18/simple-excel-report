import { TestBed } from '@angular/core/testing';

import { ExcelReportService } from './excel-report.service';

describe('ExcelReportService', () => {
  let service: ExcelReportService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExcelReportService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
