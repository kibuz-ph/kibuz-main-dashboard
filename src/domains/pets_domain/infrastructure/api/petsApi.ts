import { apiHandler } from "@/shared/infrastructure/api/apiHandler";
import type { PetsPaginatedResponse } from "../../application/constants/types";
import { API_ROUTES } from "./routesApi";

export type GetPetsParams = {
    page?: number;
    perPage?: number;
};

export const getPets = ({ page, perPage }: GetPetsParams = {}) => {
    if (page === undefined || perPage === undefined) {
        return apiHandler<PetsPaginatedResponse>(API_ROUTES.PETS);
    }

    const searchParams = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
    });

    return apiHandler<PetsPaginatedResponse>(`${API_ROUTES.PETS}?${searchParams.toString()}`);
};
