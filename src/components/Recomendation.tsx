"use client";

import { useState } from "react";
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
import { useAuthStore } from "@/store/auth.store";

export default function Recomendation() {
  const [isLoading, setIsLoading] = useState(false);
  const [recommendation, setRecommendation] = useState("");
  const accessToken = useAuthStore((state) => state.accessToken);

  console.log({ recomendation: accessToken });

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setRecommendation("");

    // Simulamos una llamada a la API
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Aquí normalmente procesaríamos los datos y obtendríamos una recomendación real
    setRecommendation(
      "Basado en tus datos, te recomendamos una dieta balanceada rica en proteínas y carbohidratos complejos. Incluye 30 minutos de ejercicio cardiovascular moderado 5 días a la semana, complementado con 2 sesiones de entrenamiento de fuerza. Asegúrate de mantenerte bien hidratado y dormir al menos 7-8 horas por noche para optimizar tu recuperación y bienestar general."
    );
    setIsLoading(false);
  };

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardHeader>
        <CardTitle className="text-center">
          Recomendación de Productos
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 items-end">
            <div className="space-y-2">
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input id="weight" type="number" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="height">Talla (cm)</Label>
              <Input id="height" type="number" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Edad</Label>
              <Input id="age" type="number" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="activity">Nivel de Actividad Física</Label>
              <Select required>
                <SelectTrigger id="activity">
                  <SelectValue placeholder="Selecciona" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="sedentary">Sedentario</SelectItem>
                  <SelectItem value="light">Ligero</SelectItem>
                  <SelectItem value="moderate">Moderado</SelectItem>
                  <SelectItem value="very-active">Muy Activo</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Procesando..." : "Obtener Recomendación"}
            </Button>
          </div>
        </form>
        <div className="space-y-2">
          <Label className="text-lg font-semibold">
            Tu Recomendación de productos:
          </Label>
          {isLoading ? (
            <div className="space-y-2 w-full">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          ) : recommendation ? (
            <div className="bg-muted p-4 rounded-md">
              <p className="text-sm">{recommendation}</p>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground italic bg-muted/50 p-4 rounded-md">
              Completa el formulario y haz clic en `{"Obtener Recomendación"}`
              para recibir los productos adecuados para ti.
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
