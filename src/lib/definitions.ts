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

export interface IPaginatedResponse<T> {
  items: T;
  total: number;
  page: number;
  size: number;
  pages: number;
}

export interface IHistoryRecomendationResponse {
  id: number;
  usuario_id: number;
  peso: number;
  talla: number;
  edad: number;
  genero: number;
  act_fisica: number;
  imc: number;
  f_recomendacion: string;
  productos: IProduct[][];
}
