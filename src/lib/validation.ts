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
    lastName: z
      .string()
      .min(3, { message: "El apellido debe tener al menos 3 caracteres" }),
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

export const RecomendationsRequestSchema = z.object({
  peso: z.number().refine((val) => val > 0 && val <= 300, {
    message:
      "El peso debe ser un número positivo y no puede ser mayor a 300 kg",
  }),
  altura: z.number().refine((val) => val > 0 && val <= 250, {
    message:
      "La altura debe ser un número positivo y no puede ser mayor a 250 cm",
  }),
  edad: z
    .number()
    .refine((val) => Number.isInteger(val) && val > 0 && val <= 120, {
      message:
        "La edad debe ser un número entero positivo y no puede ser mayor a 120 años",
    }),
  genero: z
    .string()
    .min(0, "El género debe ser 0 o 1")
    .max(1, "El género debe ser 0 o 1"),
  nivel_actividad: z
    .string()
    .min(0, "El nivel de actividad debe ser un número válido")
    .max(4, "El nivel de actividad debe estar entre 0 y 4"),
});

export type RecomendationRequestType = z.infer<
  typeof RecomendationsRequestSchema
>;
