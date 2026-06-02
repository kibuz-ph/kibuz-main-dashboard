import { useMemo } from "react";
import type { Vehicle, VehicleRow, VehiclesPaginatedResponse } from "@/domains/vehicles_domain/application/constants/types";

type UseVehicleRowsResult = {
    rows: VehicleRow[];
    total: number;
    totalPages: number;
};

const mapVehicleRows = (source: VehiclesPaginatedResponse | Vehicle[] | undefined): UseVehicleRowsResult => {
    const rawVehicles = Array.isArray(source) ? source : source?.data ?? [];

    const rows = rawVehicles.map((vehicle, index) => {
        return {
            plate: vehicle.plate ?? `Placa ${index + 1}`,
            type: vehicle.type ?? "N/A",
            brand: vehicle.brand ?? "N/A",
            model: vehicle.model ?? "N/A",
            color: vehicle.color ?? "N/A",
            apartmentId: vehicle.apartmentId ?? "N/A",
        };
    });

    return {
        rows,
        total: Array.isArray(source) ? rows.length : source?.total ?? source?.meta?.total ?? rows.length,
        totalPages: Array.isArray(source) ? 1 : source?.totalPages ?? source?.meta?.totalPages ?? 1,
    };
};

export const useVehicleRows = (source: VehiclesPaginatedResponse | Vehicle[] | undefined): UseVehicleRowsResult => {
    return useMemo(() => mapVehicleRows(source), [source]);
};
