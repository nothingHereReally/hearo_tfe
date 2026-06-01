import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatsInTable } from './stats-in-table';

describe('StatsInTable', () => {
  let component: StatsInTable;
  let fixture: ComponentFixture<StatsInTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatsInTable],
    }).compileComponents();

    fixture = TestBed.createComponent(StatsInTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
