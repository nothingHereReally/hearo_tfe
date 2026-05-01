export interface RowUserHospitalHead{
  date_joined: string;
  email: string;
  first_name: string;
  id: number;
  last_login: string;
  last_name: string;
  password_last_modified: string;
  username: string;
}
export interface RowHospitalHead{
  account_approved: boolean;
  email_verified: boolean;
  hospital_facility: number;
  is_active: boolean;
  last_update: string;
  other_hospital: string|null;
  profile_picture: string|null;
  user: RowUserHospitalHead;
}
