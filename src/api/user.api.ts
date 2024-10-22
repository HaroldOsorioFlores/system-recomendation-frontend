import {
  IUser,
  IUserLogin,
  IUserRegister,
  ResponseDto,
  ResponseLogin,
} from "@/definitions/user.definition";
import { urlLoginUser, urlRegisterUser } from "./endpoints";

export async function registerUser(
  data: IUser
): Promise<IUserRegister | Error> {
  try {
    const res = await fetch(urlRegisterUser, {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (!res.ok) {
      throw new Error("HTTP error " + res.status);
    }
    return await res.json();
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error(error as string);
  }
}

export async function loginUser(
  data: IUserLogin
): Promise<ResponseDto<ResponseLogin> | Error> {
  try {
    const formBody = new URLSearchParams(
      Object.entries(data).reduce((acc, [key, value]) => {
        acc[key] = String(value);
        return acc;
      }, {} as Record<string, string>)
    ).toString();

    const res = await fetch(urlLoginUser, {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formBody,
    });

    if (!res.ok) {
      throw new Error("HTTP error " + res.status);
    }

    const result: ResponseDto<ResponseLogin> = await res.json();

    return result;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);
    throw new Error("An unknown error occurred");
  }
}
