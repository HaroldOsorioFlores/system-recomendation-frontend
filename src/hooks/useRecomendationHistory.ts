import { getHistoryRecomendation } from "@/api/recomendation.api";
import { useMutation } from "@tanstack/react-query";

export default function useRecomendationHistory() {
  const { isError, isPending, data, mutate } = useMutation({
    mutationFn: ({ page, size, token }: { page: number; size: number, token:string }) => {
      if (token == null) {
        throw new Error("Token no disponible");
      }
      return getHistoryRecomendation(page, size, token);
    },
    onSuccess: (data) => {
      console.log("Recomendaciones obtenidas con éxito:", data);
    },
    onError: (error) => {
      console.error("Error al obtener recomendaciones:", error);
    },
  });
  return { isError, isPending, data, mutate };
}
