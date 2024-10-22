"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";

export default function AuthInterface() {
  const [isLogin, setIsLogin] = useState(true);
  const router = useRouter();

  const toggleForm = () => {
    setIsLogin(!isLogin);
    // router.push("/recomendation");
    // console.log("recomendation");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-200 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
          </CardTitle>
          <CardDescription className="text-center">
            {isLogin
              ? "Ingresa tus credenciales para acceder"
              : "Regístrate para obtener una cuenta"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {isLogin ? (
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@ejemplo.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" required />
              </div>
              <Button
                type="submit"
                className="w-full"
                onClick={() => router.push("/recomendacion")}
              >
                Iniciar Sesión
              </Button>
            </form>
          ) : (
            <form className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre Completo</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Juan Pérez"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="tu@ejemplo.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Contraseña</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar Contraseña</Label>
                <Input id="confirm-password" type="password" required />
              </div>
              <Button type="submit" className="w-full">
                Crear Cuenta
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-gray-600">
            {isLogin ? "¿No tienes una cuenta?" : "¿Ya tienes una cuenta?"}
            <Button variant="link" onClick={toggleForm} className="pl-1">
              {isLogin ? "Regístrate" : "Inicia sesión"}
            </Button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}
