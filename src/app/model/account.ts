export type RegisterUser= {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
  password: string;
  retype_password: string;
}
export type RegisterUserWarnings= {
  first_name: Array<string>;
  last_name: Array<string>;
  email: Array<string>;
  username: Array<string>;
  password: Array<string>;
  retype_password: Array<string>;
}
export interface HearoUser{
  id?: number|null;
  email?: string|null;
  username?: string|null;
  first_name?: string|null;
  last_name?: string|null;
  password_last_modified?: string|null;
  date_joined?: string|null;
  last_login?: string|null;
}
export interface HearoTeamDataStruct{
  email_verified?: boolean|null;
  is_access_account?: boolean|null;
  last_update?: string|null;
  profile_picture?: string|null;
  user?: HearoUser;
}
export interface DiffUserInfo{
  first_name: boolean;
  last_name: boolean;
  email: boolean;
  username: boolean;
}


export type ForgotPasswordField= {
  email: string,
}
export type ForgotPasswordResponse= {
  detail: string,
}
export type ResetPasswordField= {
  password: string,
  retype_password: string
}
export type ResetPasswordResponse= {
  detail: string,
  password: Array<string>
}
