export interface IUser {
  id?: number;
  nombres: string;
  apellidos: string;
  correo: string;
  contrasenia: string;
}

export type IUserLogin = Pick<IUser, "correo" | "contrasenia">;
export type IResponseRegister = Omit<IUser, "contrasenia">;

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
  lastName?: IFieldError;
  confirmPassword?: IFieldError;
}

// recomendaciones DEFINCIONES
// {
//   "peso": 0,
//   "altura": 0,
//   "edad": 0,
//   "genero": 0,
//   "nivel_actividad": 0
// }
export interface IRecomendationsRequest {
  peso: number;
  altura: number;
  edad: number;
  genero: number;
  nivel_actividad: number;
}

export interface IProduct {
  id: number;
  nombre: string;
  proteinas: number;
  grasas: number;
  carbohidratos: number;
  estado: number;
}

export interface IRecomendacion {
  combinacion_recomendada: number[];
  productos_recomendados: IProduct[];
  distancia: number;
}

export interface IFormErrorsRecomendation {
  peso?: IFieldError;
  altura?: IFieldError;
  edad?: IFieldError;
  genero?: IFieldError;
  nivel_actividad?: IFieldError;
}
