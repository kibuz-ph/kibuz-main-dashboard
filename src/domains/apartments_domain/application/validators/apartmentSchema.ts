import { z } from "zod";

export const apartmentSchema = z.object({
    towerId: z.string().trim().min(1, "La torre es obligatoria"),
    floor: z
        .number({ message: "El piso es obligatorio" })
        .int("El piso debe ser un número entero")
        .min(0, "El piso no puede ser negativo"),
    reference: z.string().trim().min(1, "La referencia es obligatoria"),
    size: z.string().trim().min(1, "El área es obligatoria"),
});

export type ApartmentSchema = z.infer<typeof apartmentSchema>;
