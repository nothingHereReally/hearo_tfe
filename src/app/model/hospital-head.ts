export interface RowUserHospitalHead{
  id: number;
  email: string;
  username: string;
  password_last_modified: string;
  first_name: string;
  last_name: string;
  date_joined: string;
  last_login: string;
}
export interface RowHospitalHead{
  user: RowUserHospitalHead;
  hospital_facility: number;
  hospital_facility_name: string;
  other_hospital: string|null;
  account_approved: boolean;
  is_active: boolean;
  email_verified: boolean;
  profile_picture: string|null;
  last_update: string;
}
export interface RowResponseHospitalHead{
  count: number;
  next: string|null;
  previous: string|null;
  results: Array<RowHospitalHead>;
}




export interface UserHospitalHead{
  id: number;
  email: string;
  username: string;
  password_last_modified: Date;
  first_name: string;
  last_name: string;
  date_joined: Date;
  last_login: Date;
}
export interface HospitalHead{
  user: UserHospitalHead;
  hospital_facility: number;
  hospital_facility_name: string;
  other_hospital: string|null;
  account_approved: boolean;
  is_active: boolean;
  email_verified: boolean;
  profile_picture: string|null;
  last_update: Date;
}
export interface ResponseHospitalHead{
  count: number;
  next: boolean;
  previous: boolean;
  results: Array<HospitalHead>;
}
