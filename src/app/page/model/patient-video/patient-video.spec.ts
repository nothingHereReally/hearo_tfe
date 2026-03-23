import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientVideo } from './patient-video';

describe('PatientVideo', () => {
  let component: PatientVideo;
  let fixture: ComponentFixture<PatientVideo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PatientVideo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientVideo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
