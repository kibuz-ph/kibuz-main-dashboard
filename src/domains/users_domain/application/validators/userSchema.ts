import { z } from "zod";

const userBaseSchema = z.object({
    document: z.string().trim().min(1, "El documento es obligatorio"),
    firstName: z.string().trim().min(1, "El primer nombre es obligatorio"),
    secondName: z.string().trim().optional(),
    lastName: z.string().trim().min(1, "El primer apellido es obligatorio"),
    secondLastName: z.string().trim().optional(),
    username: z.string().trim().min(1, "El usuario es obligatorio"),
    birthday: z.string().trim().min(1, "La fecha de nacimiento es obligatoria"),
    email: z.string().trim().min(1, "El correo es obligatorio").email("Debe ser un correo electrónico válido"),
    phone: z.string().trim().min(1, "El teléfono es obligatorio"),
    isActive: z.boolean(),
});

export const createUserSchema = userBaseSchema.extend({
    password: z.string().trim().min(6, "La contraseña debe tener mínimo 6 caracteres"),
});

export const editUserSchema = userBaseSchema.extend({
    password: z
        .union([z.string().trim().min(6, "La contraseña debe tener mínimo 6 caracteres"), z.literal("")])
        .optional(),
});

export type CreateUserSchema = z.infer<typeof createUserSchema>;
export type EditUserSchema = z.infer<typeof editUserSchema>;
