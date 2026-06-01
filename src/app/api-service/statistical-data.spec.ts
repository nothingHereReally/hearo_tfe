import { TestBed } from '@angular/core/testing';

import { StatisticalData } from './statistical-data';

describe('StatisticalData', () => {
  let service: StatisticalData;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatisticalData);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
