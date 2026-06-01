import { TestBed } from '@angular/core/testing';

import { HospitalFacility } from './hospital-facility';

describe('HospitalFacility', () => {
  let service: HospitalFacility;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HospitalFacility);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
