import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyToRegister } from './verify-to-register';

describe('VerifyToRegister', () => {
  let component: VerifyToRegister;
  let fixture: ComponentFixture<VerifyToRegister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerifyToRegister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerifyToRegister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
