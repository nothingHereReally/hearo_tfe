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
export type UserEssentialInfo= {
  first_name: string;
  last_name: string;
  email: string;
  username: string;
}
export type HearoTeamGetWithIdResponse= {
  email_verified: boolean,
  is_access_account: boolean,
  last_update: string,
  profile_picture: string,
  user: {
    date_joined: string,
    email: string
    first_name: string,
    id: number
    last_login: string,
    last_name: string,
    password_last_modified: string,
    username: string
  }
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
