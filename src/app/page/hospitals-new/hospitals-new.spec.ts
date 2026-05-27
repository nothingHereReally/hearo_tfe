import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalsNew } from './hospitals-new';

describe('HospitalsNew', () => {
  let component: HospitalsNew;
  let fixture: ComponentFixture<HospitalsNew>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospitalsNew],
    }).compileComponents();

    fixture = TestBed.createComponent(HospitalsNew);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
