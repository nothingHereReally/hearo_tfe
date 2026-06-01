import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalHead } from './hospital-head';

describe('HospitalHead', () => {
  let component: HospitalHead;
  let fixture: ComponentFixture<HospitalHead>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HospitalHead],
    }).compileComponents();

    fixture = TestBed.createComponent(HospitalHead);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
