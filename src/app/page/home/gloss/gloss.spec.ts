import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gloss } from './gloss';

describe('Gloss', () => {
  let component: Gloss;
  let fixture: ComponentFixture<Gloss>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Gloss]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gloss);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
