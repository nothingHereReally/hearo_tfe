import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelAslRecognition } from './model-asl-recognition';

describe('ModelAslRecognition', () => {
  let component: ModelAslRecognition;
  let fixture: ComponentFixture<ModelAslRecognition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelAslRecognition]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelAslRecognition);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
