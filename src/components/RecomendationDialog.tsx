"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import {
  IHistoryRecomendationResponse,
  IRecomendacion,
} from "@/lib/definitions";
import { categoryActividad, categoryIMC, formaterDate } from "@/lib/utils";
import { RecomendationAccordion } from "./RecomendationAccordion";
import { useToggleRecomendation } from "@/hooks/useToggleRecomendation";
import { ScrollArea } from "./ui/scroll-area";

export function RecomendationDialog({
  data,
}: {
  data: IHistoryRecomendationResponse;
}) {
  const adapterData: IRecomendacion[] = data.productos.map((producto) => ({
    combinacion_recomendada: [0, 1], // O cualquier lógica para determinar esto
    distancia: 0, // O cualquier lógica para calcular la distancia
    productos_recomendados: producto, // Asegúrate de que esto sea un arreglo de IProduct
  }));

  const { toggleAllAccordions, openAccordions, setOpenAccordions } =
    useToggleRecomendation();
  console.log({ adapterData });

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="default" size="sm">
          Ver recomendación
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[800px]">
        <DialogHeader>
          <DialogTitle>Recomendación de productos #{data.id}</DialogTitle>
          <DialogDescription>
            Fecha de recomendación: {formaterDate(data.f_recomendacion)}
          </DialogDescription>
          <DialogDescription>
            Tienes un IMC de <span className="font-bold">{data.imc}</span> en
            una categoria de
            <span className="font-bold"> {categoryIMC(data.imc)}</span>
          </DialogDescription>

          <DialogDescription>
            ¡Aquí tienes algunas recomendaciones de productos que hiciste con
            anterioridad!
          </DialogDescription>
        </DialogHeader>
        <DialogDescription className="font-bold">Datos: </DialogDescription>
        <div className=" grid grid-cols-2 gap-2">
          <DialogDescription>Edad: {data.edad}</DialogDescription>
          <DialogDescription>
            Genero: {data.genero == 0 ? "Masculino" : "Femenino"}
          </DialogDescription>
          <DialogDescription>Peso: {data.peso}</DialogDescription>
          <DialogDescription>Altura: {data.talla}</DialogDescription>
          <DialogDescription>
            Actividad Fisica: {categoryActividad(data.act_fisica)}
          </DialogDescription>
        </div>
        <ScrollArea className="rounded-md max-h-96">
          <RecomendationAccordion
            data={adapterData}
            openAccordions={openAccordions}
            setOpenAccordions={setOpenAccordions}
          />
        </ScrollArea>
        <DialogFooter>
          {data?.productos && (
            <Button onClick={() => toggleAllAccordions(adapterData)}>
              {openAccordions.length === 0 ? "Abrir todos" : "Cerrar todos"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
