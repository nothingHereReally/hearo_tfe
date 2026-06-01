import { TestBed } from '@angular/core/testing';

import { ApiFile } from './api-file';

describe('ApiFile', () => {
  let service: ApiFile;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiFile);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
