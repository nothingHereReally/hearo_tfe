import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountProfileQrAccessAccount } from './account-profile-qr-access-account';

describe('AccountProfileQrAccessAccount', () => {
  let component: AccountProfileQrAccessAccount;
  let fixture: ComponentFixture<AccountProfileQrAccessAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccountProfileQrAccessAccount],
    }).compileComponents();

    fixture = TestBed.createComponent(AccountProfileQrAccessAccount);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
