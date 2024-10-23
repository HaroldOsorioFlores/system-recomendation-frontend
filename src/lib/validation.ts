import * as z from "zod";

export const loginUserSchema = z.object({
  email: z.string().email({ message: "Correo electrónico inválido" }),
  password: z
    .string()
    .min(3, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export const registerSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "El nombre debe tener al menos 3 caracteres" }),
    email: z.string().email({ message: "Correo electrónico inválido" }),
    password: z
      .string()
      .min(3, { message: "La contraseña debe tener al menos 6 caracteres" }),
    confirmPassword: z
      .string()
      .min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
  });

export type LoginUserType = z.infer<typeof loginUserSchema>;
export type RegisterUserType = z.infer<typeof registerSchema>;
