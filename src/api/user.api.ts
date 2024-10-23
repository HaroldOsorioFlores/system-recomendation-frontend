import { IUser, IUserRegister, ResponseLogin } from "@/lib/definitions";
import { urlLoginUser, urlRegisterUser } from "./endpoints";
import { LoginUserType } from "@/lib/validation";

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
  data: LoginUserType
): Promise<ResponseLogin | Error> {
  try {
    console.log({ dataApi: data });
    const formBody = new URLSearchParams({
      username: data.email, // Envía 'username' como parte del cuerpo de la solicitud
      password: data.password, // Envía 'password' también
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
