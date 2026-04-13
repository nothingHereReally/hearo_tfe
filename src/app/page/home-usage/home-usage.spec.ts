import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUsage } from './home-usage';

describe('HomeUsage', () => {
  let component: HomeUsage;
  let fixture: ComponentFixture<HomeUsage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeUsage],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeUsage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
