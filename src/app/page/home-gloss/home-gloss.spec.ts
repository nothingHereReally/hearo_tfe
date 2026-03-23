import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeGloss } from './home-gloss';

describe('HomeGloss', () => {
  let component: HomeGloss;
  let fixture: ComponentFixture<HomeGloss>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeGloss]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeGloss);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
