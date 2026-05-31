import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignHospitalFacilityCard } from './assign-hospital-facility-card';

describe('AssignHospitalFacilityCard', () => {
  let component: AssignHospitalFacilityCard;
  let fixture: ComponentFixture<AssignHospitalFacilityCard>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssignHospitalFacilityCard],
    }).compileComponents();

    fixture = TestBed.createComponent(AssignHospitalFacilityCard);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
