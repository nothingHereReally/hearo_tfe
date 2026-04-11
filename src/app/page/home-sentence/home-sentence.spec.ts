import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSentence } from './home-sentence';

describe('HomeSentence', () => {
  let component: HomeSentence;
  let fixture: ComponentFixture<HomeSentence>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeSentence],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeSentence);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
