import { useMemo } from "react";
import type {
    Apartment,
    ApartmentRow,
    ApartmentsPaginatedResponse,
} from "@/domains/apartments_domain/application/constants/types";

type UseApartmentRowsResult = {
    rows: ApartmentRow[];
    total: number;
    totalPages: number;
};

const toApartmentRow = (apartment: Apartment): ApartmentRow => ({
    id: apartment.id,
    reference: apartment.reference,
    floor: apartment.floor,
    size: apartment.size,
    towerId: apartment.towerId,
    tower: apartment.tower?.name ?? "Sin torre",
});

const mapApartmentRows = (source: ApartmentsPaginatedResponse | undefined): UseApartmentRowsResult => {
    const rows = (source?.items ?? []).map(toApartmentRow);

    return {
        rows,
        total: source?.pagination.totalItems ?? rows.length,
        totalPages: Math.max(1, source?.pagination.totalPages ?? 1),
    };
};

export const useApartmentRows = (source: ApartmentsPaginatedResponse | undefined): UseApartmentRowsResult => {
    return useMemo(() => mapApartmentRows(source), [source]);
};
