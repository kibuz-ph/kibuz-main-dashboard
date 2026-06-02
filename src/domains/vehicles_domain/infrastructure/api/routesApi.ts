import BASE_URL from "@/shared/infrastructure/api/backend-urls";

export const API_ROUTES = {
    VEHICLES_BY_APARTMENT: (id: string, apartmentId: string) =>
        `${BASE_URL}vehicles/${id}/apartment/${apartmentId}`,
} as const;
