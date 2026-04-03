import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccountProfileQrAccessAccount } from './account-profile-qr-access-account';

describe('AccountProfileQrAccessAccount', () => {
  let component: AccountProfileQrAccessAccount;
  let fixture: ComponentFixture<AccountProfileQrAccessAccount>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccountProfileQrAccessAccount]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccountProfileQrAccessAccount);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
