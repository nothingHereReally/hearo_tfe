import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PieChartPercent } from './pie-chart-percent';

describe('PieChartPercent', () => {
  let component: PieChartPercent;
  let fixture: ComponentFixture<PieChartPercent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PieChartPercent],
    }).compileComponents();

    fixture = TestBed.createComponent(PieChartPercent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
