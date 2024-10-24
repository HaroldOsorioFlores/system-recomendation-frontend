export interface IUser {
  id: number;
  nombres: string;
  apellidos: string;
  correo: string;
  contrasenia: string;
}

export type IUserLogin = Pick<IUser, "correo" | "contrasenia">;

export interface ResponseDto<T> {
  status_code: number;
  detail: string;
  data: T;
}

export type IUserResponse = Pick<IUser, "correo" | "nombres">;

export interface ResponseLogin {
  access_token: string;
  token_type: string;
}

export type token = Pick<ResponseLogin, "access_token">;

export interface IFieldError {
  message: string;
  ref?: React.RefObject<HTMLInputElement>;
  type: string;
}

export interface IFormErrors {
  username?: IFieldError;
  password?: IFieldError;
  email?: IFieldError;
  name?: IFieldError;
  confirmPassword?: IFieldError;
}
