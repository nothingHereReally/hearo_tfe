import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelAslRecognition } from './model-asl-recognition';

describe('ModelAslRecognition', () => {
  let component: ModelAslRecognition;
  let fixture: ComponentFixture<ModelAslRecognition>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModelAslRecognition],
    }).compileComponents();

    fixture = TestBed.createComponent(ModelAslRecognition);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
