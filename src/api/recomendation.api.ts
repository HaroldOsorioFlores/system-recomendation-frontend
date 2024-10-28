import {
  IRecomendacion,
  ResponseDto,
} from "@/lib/definitions";
import { urlRecomendations } from "./endpoints";
import { RecomendationRequestType } from "@/lib/validation";

export async function getRecomendation(
  data: RecomendationRequestType,
  token: string
): Promise<ResponseDto<IRecomendacion>> {
  try {
    const formattedData = {
        ...data,
        nivel_actividad: Number(data.nivel_actividad), // Convertir a número al enviar
      };
    const response = await fetch(urlRecomendations, {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(formattedData),
    });

    const result: ResponseDto<IRecomendacion> = await response.json();
    console.log({ resultRecomendationApi: result });
    return result;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    console.log("Ocurrio un error");
    throw new Error(error as string);
  }
}
