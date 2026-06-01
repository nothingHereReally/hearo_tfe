import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGloss } from './home-gloss';

describe('HomeGloss', () => {
  let component: HomeGloss;
  let fixture: ComponentFixture<HomeGloss>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeGloss],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeGloss);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
