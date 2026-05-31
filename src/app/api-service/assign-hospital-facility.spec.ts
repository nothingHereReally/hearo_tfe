import { TestBed } from '@angular/core/testing';

import { AssignHospitalFacility } from './assign-hospital-facility';

describe('AssignHospitalFacility', () => {
  let service: AssignHospitalFacility;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssignHospitalFacility);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
