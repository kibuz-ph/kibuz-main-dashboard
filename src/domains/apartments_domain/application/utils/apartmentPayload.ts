import type {
    Apartment,
    ApartmentPayload,
    UpdateApartmentPayload,
} from "@/domains/apartments_domain/application/constants/types";
import type { ApartmentSchema } from "../validators/apartmentSchema";

export const APARTMENT_FORM_DEFAULT_VALUES: ApartmentSchema = {
    towerId: "",
    floor: Number.NaN,
    reference: "",
    size: "",
};

export const toApartmentFormValues = (apartment: Apartment): ApartmentSchema => ({
    towerId: apartment.towerId ?? "",
    floor: apartment.floor,
    reference: apartment.reference ?? "",
    size: apartment.size ?? "",
});

export const toApartmentPayload = (values: ApartmentSchema): ApartmentPayload => ({
    towerId: values.towerId,
    floor: values.floor,
    reference: values.reference.trim(),
    size: values.size.trim(),
});

// Solo se envian los campos que cambiaron, para no disparar validaciones de duplicado
// sobre la referencia del propio apartamento.
export const buildApartmentUpdatePayload = (values: ApartmentSchema, original?: Apartment): UpdateApartmentPayload => {
    const candidate = toApartmentPayload(values);
    if (!original) return candidate;

    const originalValues = toApartmentPayload(toApartmentFormValues(original));
    const changedKeys = (Object.keys(candidate) as Array<keyof ApartmentPayload>).filter(
        (key) => candidate[key] !== originalValues[key]
    );

    return Object.fromEntries(changedKeys.map((key) => [key, candidate[key]])) as UpdateApartmentPayload;
};
