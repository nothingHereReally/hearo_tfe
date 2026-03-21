import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sentence } from './sentence';

describe('Sentence', () => {
  let component: Sentence;
  let fixture: ComponentFixture<Sentence>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Sentence]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sentence);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
