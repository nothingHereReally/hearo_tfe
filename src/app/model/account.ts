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
