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
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  loginUserSchema,
  registerSchema,
  RegisterUserType,
  LoginUserType,
} from "@/lib/validation";
import { IFormErrors } from "@/lib/definitions";
import { useLogin, useRegister } from "@/hooks/useLogin";
import Image from "next/image";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";

export default function AuthInterface() {
  const [isLogin, setIsLogin] = useState(true);

  const loginHook = useLogin();
  const registerHook = useRegister();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginUserType | RegisterUserType>({
    resolver: zodResolver(isLogin ? loginUserSchema : registerSchema),
    defaultValues: isLogin
      ? { email: "", password: "" }
      : {
          name: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
  });

  const errorsForm = errors as IFormErrors;

  const onFormSubmit: SubmitHandler<LoginUserType | RegisterUserType> = (
    data
  ) => {
    console.log({ data });
    if (isLogin) {
      loginHook.mutate(data as LoginUserType);
    } else {
      registerHook.mutate(data as RegisterUserType);
    }

    reset();
    router.push("/recomendacion");
  };

  const toggleForm = () => {
    setIsLogin(!isLogin);
    reset();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-green-200 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            ReecFoodCato
          </CardTitle>
          <div className="w-[100px] h-[100px] mx-auto">
            <AspectRatio ratio={16 / 9}>
              <Image
                alt="Logo universidad Catolica de Santa Maria"
                src="/logoUcsm.png"
                width={100}
                height={100}
                className=" mb-4"
                priority
              />
            </AspectRatio>
          </div>
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
          <form className="space-y-4" onSubmit={handleSubmit(onFormSubmit)}>
            {!isLogin && (
              <>
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre Completo</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Juan"
                    {...register("name")}
                  />
                  {errorsForm.name && (
                    <p className="text-red-500 text-sm">
                      {errorsForm.name.message}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Apellido Completo</Label>
                  <Input
                    id="lastName"
                    type="text"
                    placeholder="Perez"
                    {...register("lastName")}
                  />
                  {errorsForm.name && (
                    <p className="text-red-500 text-sm">
                      {errorsForm.lastName?.message}
                    </p>
                  )}
                </div>
              </>
            )}
            <div className="space-y-2">
              <Label htmlFor="email">Correo Electrónico</Label>
              <Input
                id="email"
                type="email"
                placeholder="jperez@gmail.com"
                {...register("email")}
              />
              {errorsForm.email && (
                <p className="text-red-500 text-sm">
                  {errorsForm.email.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" type="password" {...register("password")} />
              {errorsForm.password && (
                <p className="text-red-500 text-sm">
                  {errorsForm.password.message}
                </p>
              )}
            </div>
            {!isLogin && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar Contraseña</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  {...register("confirmPassword")}
                />
                {errorsForm.confirmPassword && (
                  <p className="text-red-500 text-sm">
                    {errorsForm.confirmPassword.message}
                  </p>
                )}
              </div>
            )}
            <Button type="submit" className="w-full">
              {isLogin ? "Iniciar Sesión" : "Crear Cuenta"}
            </Button>
          </form>
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
