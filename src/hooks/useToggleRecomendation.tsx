import { IRecomendacion } from "@/lib/definitions";
import * as React from "react";

export function useToggleRecomendation() {
  const [openAccordions, setOpenAccordions] = React.useState<string[]>([]);
  console.log({ openAccordions });

  const toggleAllAccordions = (data: IRecomendacion[]) => {
    if (openAccordions.length === 0) {
      const allAccordions = data.flatMap((combination, index) => [
        `combination-${index}`,
        ...combination.productos_recomendados.map(
          (product) => `product-${product.id}-${index}`
        ),
      ]);
      setOpenAccordions(allAccordions);
    } else {
      setOpenAccordions([]);
    }
  };
  return { setOpenAccordions, openAccordions, toggleAllAccordions };
}
