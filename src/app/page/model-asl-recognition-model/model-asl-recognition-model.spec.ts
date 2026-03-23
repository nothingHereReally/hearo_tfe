import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelAslRecognitionModel } from './model-asl-recognition-model';

describe('ModelAslRecognitionModel', () => {
  let component: ModelAslRecognitionModel;
  let fixture: ComponentFixture<ModelAslRecognitionModel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelAslRecognitionModel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelAslRecognitionModel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
