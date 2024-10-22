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
