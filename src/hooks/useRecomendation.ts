import { getRecomendation } from "@/api/recomendation.api";
import { RecomendationRequestType } from "@/lib/validation";
import { useMutation } from "@tanstack/react-query";

export default function useRecomendation() {
  const dataInitial: RecomendationRequestType = {
    peso: 68.2,
    altura: 168,
    edad: 22,
    genero: "0",
    nivel_actividad: "2",
  };
  const { isError, isPending, data, mutate } = useMutation({
    mutationFn: ({
      data = dataInitial,
      token,
    }: {
      data: RecomendationRequestType;
      token: string;
    }) => getRecomendation(data, token),
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error("Error al obtener recomendaciones:", error);
    },
  });
  return { isError, isPending, data, mutate };
}
