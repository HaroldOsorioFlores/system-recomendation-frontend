import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isTokenExpired = (exp: number) => {
  if (!exp) return true;
  return Date.now() >= exp * 1000;
};

export function formaterDate(inputDate: string) {
  const date = new Date(inputDate + "Z");

  const formatter = new Intl.DateTimeFormat("es-PE", {
    timeZone: "America/Lima",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: true,
  });

  const formattedDate = formatter.format(date);

  return formattedDate;
}

export function categoryIMC(imc: number): string {
  if (imc < 16) {
    return "Delgadez severa";
  } else if (imc >= 16 && imc <= 16.99) {
    return "Delgadez moderada";
  } else if (imc >= 17 && imc <= 18.49) {
    return "Delgadez aceptable";
  } else if (imc >= 18.5 && imc <= 24.99) {
    return "Peso normal";
  } else if (imc >= 25 && imc <= 34.99) {
    return "Sobrepeso";
  } else if (imc >= 35 && imc <= 39.99) {
    return "Obesidad tipo I";
  } else if (imc >= 40 && imc <= 49.99) {
    return "Obesidad tipo II (obesidad mórbida)";
  } else if (imc >= 50) {
    return "Obesidad tipo III o extrema";
  } else {
    return "IMC no válido";
  }
}

export function categoryActividad(actividad: number): string {
  if (actividad == 0) {
    return "Sedentario";
  }
  if (actividad == 1) {
    return "Ligero";
  }
  if (actividad == 2) {
    return "Moderado";
  }
  if (actividad == 3) {
    return "Muy activo";
  }
  return "Actividad fisica no valido";
}
