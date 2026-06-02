import { apiHandler } from "@/shared/infrastructure/api/apiHandler";
import type { VehiclesPaginatedResponse } from "../../application/constants/types";
import { API_ROUTES } from "./routesApi";

export type GetVehiclesByApartmentParams = {
    id: string;
    apartmentId: string;
};

export const getVehiclesByApartment = ({ id, apartmentId }: GetVehiclesByApartmentParams) => {
    return apiHandler<VehiclesPaginatedResponse>(API_ROUTES.VEHICLES_BY_APARTMENT(id, apartmentId));
};
