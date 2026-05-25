import { TestBed } from '@angular/core/testing';

import { HospitalHeadDocument } from './hospital-head-document';

describe('HospitalHeadDocument', () => {
  let service: HospitalHeadDocument;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HospitalHeadDocument);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
