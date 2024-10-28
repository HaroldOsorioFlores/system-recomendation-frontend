import { getRecomendation } from "@/api/recomendation.api";
import { RecomendationRequestType } from "@/lib/validation";
import { useMutation } from "@tanstack/react-query";

export default function useRecomendation() {
  const { isError, isPending, data, mutate } = useMutation({
    mutationFn: ({
      data,
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
