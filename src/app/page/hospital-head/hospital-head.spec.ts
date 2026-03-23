import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HospitalHead } from './hospital-head';

describe('HospitalHead', () => {
  let component: HospitalHead;
  let fixture: ComponentFixture<HospitalHead>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HospitalHead]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HospitalHead);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
