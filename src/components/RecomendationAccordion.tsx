import { IRecomendacion } from "@/lib/definitions";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

interface RecomendationAccordionProps {
  data: IRecomendacion[];
  openAccordions: string[];
  setOpenAccordions: (value: string[]) => void;
}
export function RecomendationAccordion({
  data,
  openAccordions,
  setOpenAccordions,
}: RecomendationAccordionProps) {
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {data.map((combination, index) => (
          <Accordion
            key={index}
            type="multiple"
            value={openAccordions}
            onValueChange={setOpenAccordions}
            className="w-full"
          >
            <AccordionItem value={`combination-${index}`}>
              <AccordionTrigger>
                Lista de Recomendación {index + 1}
              </AccordionTrigger>
              <AccordionContent>
                <div className="pl-4">
                  <Accordion
                    type="multiple"
                    value={openAccordions}
                    onValueChange={setOpenAccordions}
                    className="w-full"
                  >
                    {combination.productos_recomendados.map((product) => (
                      <AccordionItem
                        key={product.id}
                        value={`product-${product.id}-${index}`}
                      >
                        <AccordionTrigger>{product.nombre}</AccordionTrigger>
                        <AccordionContent>
                          <div className="pl-4">
                            <p className="flex justify-between w-full pr-4">
                              Proteínas: <span>{product.proteinas}g</span>
                            </p>
                            <p className="flex justify-between w-full pr-4">
                              Grasas: <span>{product.grasas}g</span>
                            </p>
                            <p className="flex justify-between w-full pr-4">
                              Carbohidratos:{" "}
                              <span>{product.carbohidratos}g</span>
                            </p>
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))}
      </div>
    </>
  );
}
