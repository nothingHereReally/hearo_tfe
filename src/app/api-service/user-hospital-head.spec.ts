import { TestBed } from '@angular/core/testing';

import { UserHospitalHead } from './user-hospital-head';

describe('UserHospitalHead', () => {
  let service: UserHospitalHead;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserHospitalHead);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
