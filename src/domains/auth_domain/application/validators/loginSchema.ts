import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string()
        .trim()
        .min(1, "El correo electrónico es obligatorio")
        .email("Debe ser un correo electrónico válido"),

    password: z
        .string()
        .trim()
        .min(6, "La contraseña debe tener mínimo 6 caracteres"),
});

export type LoginSchema = z.infer<typeof loginSchema>;