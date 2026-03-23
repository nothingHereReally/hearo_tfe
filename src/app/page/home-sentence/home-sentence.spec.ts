import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeSentence } from './home-sentence';

describe('HomeSentence', () => {
  let component: HomeSentence;
  let fixture: ComponentFixture<HomeSentence>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeSentence]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeSentence);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
