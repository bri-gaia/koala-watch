import { TestBed } from '@angular/core/testing';

import { ActiveRecordService } from './active-record.service';

describe('ActiveRecordService', () => {
  let service: ActiveRecordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ActiveRecordService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
