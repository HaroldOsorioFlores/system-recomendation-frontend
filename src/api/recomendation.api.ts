import {
  IHistoryRecomendationResponse,
  IPaginatedResponse,
  IRecomendacion,
  ResponseDto,
} from "@/lib/definitions";
import { urlHistoryRecomendations, urlRecomendations } from "./endpoints";
import { RecomendationRequestType } from "@/lib/validation";

export async function getRecomendation(
  data: RecomendationRequestType,
  token: string
): Promise<ResponseDto<IRecomendacion[]>> {
  try {
    const formattedData = {
      ...data,
      genero: Number(data.genero),
      nivel_actividad: Number(data.nivel_actividad),
    };

    console.log({ formattedData });
    const response = await fetch(urlRecomendations, {
      cache: "no-cache",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: JSON.stringify(formattedData),
    });

    const result: ResponseDto<IRecomendacion[]> = await response.json();
    console.log({ resultRecomendationApi: result.data });
    return result;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    console.log("Ocurrio un error");
    throw new Error(error as string);
  }
}

export async function getHistoryRecomendation(
  page: number = 1,
  size: number = 10,
  token: string
): Promise<IPaginatedResponse<IHistoryRecomendationResponse[]>> {
  try {
    const urlFetch = `${urlHistoryRecomendations}?page=${page}&size=${size}`;
    console.log({ urlFetch });
    const response = await fetch(urlFetch, {
      cache: "no-cache",
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
    });
    const result: IPaginatedResponse<IHistoryRecomendationResponse[]> =
      await response.json();
    console.log({ resultAPi: result.items });
    return result;
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
    console.log("Ocurrio un error");
    throw new Error(error as string);
  }
}
