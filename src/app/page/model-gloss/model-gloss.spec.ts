import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelGloss } from './model-gloss';

describe('ModelGloss', () => {
  let component: ModelGloss;
  let fixture: ComponentFixture<ModelGloss>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModelGloss]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModelGloss);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
