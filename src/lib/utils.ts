import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const isTokenExpired = (exp: number) => {
  if (!exp) return true;
  return Date.now() >= exp * 1000;
};
