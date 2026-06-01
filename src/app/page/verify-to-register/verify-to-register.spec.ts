import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyToRegister } from './verify-to-register';

describe('VerifyToRegister', () => {
  let component: VerifyToRegister;
  let fixture: ComponentFixture<VerifyToRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VerifyToRegister],
    }).compileComponents();

    fixture = TestBed.createComponent(VerifyToRegister);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
