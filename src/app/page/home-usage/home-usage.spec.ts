import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeUsage } from './home-usage';

describe('HomeUsage', () => {
  let component: HomeUsage;
  let fixture: ComponentFixture<HomeUsage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HomeUsage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeUsage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
