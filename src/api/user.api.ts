import { IResponseRegister, IUser, ResponseLogin } from "@/lib/definitions";
import { urlLoginUser, urlRegisterUser } from "./endpoints";
import { LoginUserType, RegisterUserType } from "@/lib/validation";

export async function registerUser(
  data: RegisterUserType
): Promise<IResponseRegister | Error> {
  try {
    const dataMaped: IUser = {
      nombres: data.name,
      apellidos: data.lastName,
      correo: data.email,
      contrasenia: data.password
    }
    const res = await fetch(urlRegisterUser, {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dataMaped),
    });
    if (!res.ok) {
      throw new Error("HTTP error " + res.status);
    }
    const result: IResponseRegister = await res.json();
    return result;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error(error as string);
  }
}

export async function loginUser(
  data: LoginUserType
): Promise<ResponseLogin | Error> {
  try {
    console.log({ dataApi: data });
    const formBody = new URLSearchParams({
      username: data.email,
      password: data.password,
    }).toString();

    console.log({ formBody });

    const res = await fetch(urlLoginUser, {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    });
    console.log({ res });
    if (!res.ok) {
      const errorDetails = await res.json();
      console.log("Error details from server:", errorDetails);
      throw new Error("HTTP error " + res.status + ": " + errorDetails.message);
    }

    const result: ResponseLogin = await res.json();

    console.log({ result });

    return result;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("An unknown error occurred");
  }
}
