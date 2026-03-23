import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelPatientVideo } from './model-patient-video';

describe('ModelPatientVideo', () => {
  let component: ModelPatientVideo;
  let fixture: ComponentFixture<ModelPatientVideo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelPatientVideo]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelPatientVideo);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
