import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalHeadInstance } from './hospital-head-instance';

describe('HospitalHeadInstance', () => {
  let component: HospitalHeadInstance;
  let fixture: ComponentFixture<HospitalHeadInstance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospitalHeadInstance],
    }).compileComponents();

    fixture = TestBed.createComponent(HospitalHeadInstance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
