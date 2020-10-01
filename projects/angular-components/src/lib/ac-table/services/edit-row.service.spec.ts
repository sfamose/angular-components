import { TestBed } from '@angular/core/testing';

import { EditRowService } from './edit-row.service';

describe('EditService', () => {
  let service: EditRowService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditRowService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
