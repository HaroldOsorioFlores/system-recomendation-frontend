"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import useAuthStore from "@/store/auth.store";
import useRecomendation from "@/hooks/useRecomendation";
import { IFormErrorsRecomendation } from "@/lib/definitions";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import {
  RecomendationRequestType,
  RecomendationsRequestSchema,
} from "@/lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { RecomendationAccordion } from "./RecomendationAccordion";
import { useToggleRecomendation } from "@/hooks/useToggleRecomendation";

export default function Recomendation() {
  const { token } = useAuthStore();
  const { data, isPending, mutate } = useRecomendation();
  const { toggleAllAccordions, openAccordions, setOpenAccordions } =
    useToggleRecomendation();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<RecomendationRequestType>({
    resolver: zodResolver(RecomendationsRequestSchema),
    defaultValues: {
      peso: 68.2,
      altura: 168,
      edad: 22,
      genero: "0",
      nivel_actividad: "2",
    },
  });

  const onForSubmit: SubmitHandler<RecomendationRequestType> = (data) => {
    console.log({ data });
    if (token) mutate({ data: data, token: token });
  };

  const errosForm = errors as IFormErrorsRecomendation;

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          Recomendación de Productos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <form onSubmit={handleSubmit(onForSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-end">
            {/* Peso */}
            <div className="space-y-2">
              <Label htmlFor="weight">Peso (kg)</Label>
              <Controller
                name="peso"
                control={control}
                render={({ field }) => (
                  <Input
                    id="weight"
                    type="number"
                    value={isNaN(field.value) ? "" : field.value}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      console.log({ value: value }, typeof value);
                      field.onChange(value);
                    }}
                  />
                )}
              />
              {errosForm.peso && (
                <p className="text-red-500">{errosForm.peso.message}</p>
              )}
            </div>

            {/* Altura */}
            <div className="space-y-2">
              <Label htmlFor="height">Talla (cm)</Label>
              <Controller
                name="altura"
                control={control}
                render={({ field }) => (
                  <Input
                    id="height"
                    type="number"
                    value={isNaN(field.value) ? "" : field.value}
                    onChange={(e) => {
                      const value = parseFloat(e.target.value);
                      field.onChange(value);
                    }}
                  />
                )}
              />
              {errosForm.altura && (
                <p className="text-red-500">{errosForm.altura.message}</p>
              )}
            </div>

            {/* Edad */}
            <div className="space-y-2">
              <Label htmlFor="age">Edad</Label>
              <Controller
                name="edad"
                control={control}
                render={({ field }) => (
                  <Input
                    id="age"
                    type="number"
                    value={isNaN(field.value) ? "" : field.value}
                    onChange={(e) => {
                      const value = parseInt(e.target.value);
                      field.onChange(value);
                    }}
                  />
                )}
              />
              {errosForm.edad && (
                <p className="text-red-500">{errosForm.edad.message}</p>
              )}
            </div>

            {/* Género */}
            <div className="space-y-2">
              <Label>Género</Label>
              <Controller
                name="genero"
                control={control}
                render={({ field }) => (
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Masculino</SelectItem>
                      <SelectItem value="1">Femenino</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errosForm.genero && (
                <p className="text-red-500">{errosForm.genero.message}</p>
              )}
            </div>

            {/* Nivel de Actividad Física */}
            <div className="space-y-2">
              <Label>Nivel de Actividad Física</Label>
              <Controller
                name="nivel_actividad"
                control={control}
                render={({ field }) => (
                  <Select
                    defaultValue={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Sedentario</SelectItem>
                      <SelectItem value="1">Ligero</SelectItem>
                      <SelectItem value="2">Moderado</SelectItem>
                      <SelectItem value="3">Muy Activo</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />
              {errosForm.nivel_actividad && (
                <p className="text-red-500">
                  {errosForm.nivel_actividad.message}
                </p>
              )}
            </div>

            <Button type="submit" className="w-full" disabled={isPending}>
              {isPending ? "Procesando..." : "Obtener Recomendación"}
            </Button>
          </div>
        </form>

        <div className="space-y-4">
          <div className="flex gap-4 justify-between">
            <Label className="text-lg font-semibold">
              Tu Recomendación de productos:
            </Label>
            {data?.data && (
              <Button onClick={() => toggleAllAccordions(data.data)}>
                {openAccordions.length === 0 ? "Abrir todos" : "Cerrar todos"}
              </Button>
            )}
          </div>
          {isPending ? (
            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          ) : data?.data ? (
            <RecomendationAccordion
              data={data.data}
              openAccordions={openAccordions}
              setOpenAccordions={setOpenAccordions}
            />
          ) : (
            <p className="text-sm text-muted-foreground italic bg-muted/50 p-4 rounded-md">
              No se encontraron productos recomendados.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
