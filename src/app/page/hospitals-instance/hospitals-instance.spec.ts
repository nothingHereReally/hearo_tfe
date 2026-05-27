import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalsInstance } from './hospitals-instance';

describe('HospitalsInstance', () => {
  let component: HospitalsInstance;
  let fixture: ComponentFixture<HospitalsInstance>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospitalsInstance],
    }).compileComponents();

    fixture = TestBed.createComponent(HospitalsInstance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
