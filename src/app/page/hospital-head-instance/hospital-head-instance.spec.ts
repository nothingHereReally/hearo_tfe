import { ComponentFixture, TestBed } from '@angular/core/testing';
import { signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { of, Subject } from 'rxjs';

import { HospitalHeadInstance } from './hospital-head-instance';
import { UserHospitalHead } from '../../api-service/user-hospital-head';
import { HospitalHeadDocument } from '../../api-service/hospital-head-document';
import { HospitalFacility } from '../../api-service/hospital-facility';
import { ApiFile } from '../../api-service/api-file';
import { AuthUser } from '../../api-service/auth-user';
import { RowHospitalHead } from '../../model/hospital-head';

describe('HospitalHeadInstance', () => {
  let component: HospitalHeadInstance;
  let fixture: ComponentFixture<HospitalHeadInstance>;
  let userHospitalHeadService: any;

  const inactiveRow: RowHospitalHead = {
    user: {
      id: 65,
      email: 'velez@example.com',
      username: 'velez_general_admin',
      password_last_modified: '2026-01-01T00:00:00Z',
      first_name: 'Velez',
      last_name: 'Admin',
      date_joined: '2026-01-01T00:00:00Z',
      last_login: '2026-01-01T00:00:00Z',
    },
    hospital_facility: null,
    hospital_facility_name: '',
    other_hospital: 'Other Hospital',
    account_approved: true,
    is_active: false,
    email_verified: false,
    profile_picture: null,
    last_update: '2026-01-01T00:00:00Z',
  };

  const activeRow: RowHospitalHead = {
    ...inactiveRow,
    is_active: true,
  };

  const toHospitalHead = (row: RowHospitalHead) => ({
    ...row,
    user: {
      ...row.user,
      password_last_modified: new Date(row.user.password_last_modified),
      date_joined: new Date(row.user.date_joined),
      last_login: new Date(row.user.last_login),
    },
    last_update: new Date(row.last_update),
  });

  beforeEach(async () => {
    userHospitalHeadService = {
      getHospitalHeadById: vi.fn(() => of(inactiveRow)),
      editHospitalHead: vi.fn(() => of(activeRow)),
      getHospitalHeadFromRow: vi.fn(toHospitalHead),
    };

    await TestBed.configureTestingModule({
      imports: [HospitalHeadInstance],
      providers: [
        { provide: UserHospitalHead, useValue: userHospitalHeadService },
        {
          provide: HospitalHeadDocument,
          useValue: {
            getPageDocumentsByHospitalHeadId: vi.fn(() => of({ count: 0, next: null, previous: null, results: [] }))
          }
        },
        { provide: HospitalFacility, useValue: { getHospitalFacilityById: vi.fn() } },
        {
          provide: ApiFile,
          useValue: {
            cachedProfilePicture: signal('/user_default_profile.svg'),
            getHospitalHeadDocumentsViaZipFile: vi.fn(),
            updateProfilePhotoAsync: vi.fn(),
          }
        },
        {
          provide: AuthUser,
          useValue: {
            cachedHearoUser: signal({
              email_verified: true,
              is_access_account: true,
              last_update: '',
              profile_picture: '',
              user: {
                id: 1,
                email: 'team@example.com',
                username: 'team',
                first_name: 'Team',
                last_name: 'User',
                password_last_modified: '',
                date_joined: '',
                last_login: '',
              }
            }),
            updateHearoUserOnCacheAsync: vi.fn()
          }
        },
        { provide: Router, useValue: { url: '/hospital-head/65', currentNavigation: () => null, navigate: vi.fn() } },
        { provide: ActivatedRoute, useValue: { snapshot: { params: { hhid: '65' } } } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(HospitalHeadInstance);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('uses the backend response as the inactive source of truth on load', async () => {
    await component.ngOnInit();

    expect((component as any).hospitalHeadUser().is_active).toBe(false);
  });

  it('sends only is_active true when activating', async () => {
    await component.ngOnInit();

    await (component as any).setHospitalHeadActive(true);

    expect(userHospitalHeadService.editHospitalHead).toHaveBeenCalledOnce();
    expect(userHospitalHeadService.editHospitalHead).toHaveBeenCalledWith(65, { is_active: true });
  });

  it('sends only is_active false when deactivating', async () => {
    userHospitalHeadService.getHospitalHeadById.mockReturnValue(of(activeRow));
    await component.ngOnInit();

    await (component as any).setHospitalHeadActive(false);

    expect(userHospitalHeadService.editHospitalHead).toHaveBeenCalledOnce();
    expect(userHospitalHeadService.editHospitalHead).toHaveBeenCalledWith(65, { is_active: false });
  });

  it('ignores duplicate activation while an update is in flight', async () => {
    const pendingPatch = new Subject<RowHospitalHead>();
    userHospitalHeadService.editHospitalHead.mockReturnValue(pendingPatch.asObservable());
    await component.ngOnInit();

    const first = (component as any).setHospitalHeadActive(true);
    await (component as any).setHospitalHeadActive(true);
    pendingPatch.next(activeRow);
    pendingPatch.complete();
    await first;

    expect(userHospitalHeadService.editHospitalHead).toHaveBeenCalledTimes(1);
  });

  it('replaces local state with the follow-up GET response after success', async () => {
    userHospitalHeadService.getHospitalHeadById
      .mockReturnValueOnce(of(inactiveRow))
      .mockReturnValueOnce(of(activeRow));
    await component.ngOnInit();

    await (component as any).setHospitalHeadActive(true);

    expect(userHospitalHeadService.getHospitalHeadById).toHaveBeenLastCalledWith(65);
    expect((component as any).hospitalHeadUser().is_active).toBe(true);
  });
});
