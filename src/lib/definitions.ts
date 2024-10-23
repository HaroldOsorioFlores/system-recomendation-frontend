export interface IUser {
  id: number;
  nombres: string;
  apellidos: string;
  correo: string;
  contrasenia: string;
}

export type IUserLogin = Pick<IUser, "correo" | "contrasenia">;

export type IUserRegister = Omit<IUser, "id">;

export interface ResponseDto<T> {
  status_code: number;
  detail: string;
  data: T;
}

export interface ResponseLogin {
  access_token: string;
  token_type: string;
}

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
