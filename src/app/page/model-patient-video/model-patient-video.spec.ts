import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelPatientVideo } from './model-patient-video';

describe('ModelPatientVideo', () => {
  let component: ModelPatientVideo;
  let fixture: ComponentFixture<ModelPatientVideo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelPatientVideo],
    }).compileComponents();

    fixture = TestBed.createComponent(ModelPatientVideo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
