import BASE_URL from "@/shared/infrastructure/api/backend-urls";

export const API_ROUTES = {
    APARTMENTS: (residentialComplexId: string) => `${BASE_URL}residential-complexes/${residentialComplexId}/apartments`,
    APARTMENT_BY_ID: (residentialComplexId: string, apartmentId: string) =>
        `${BASE_URL}residential-complexes/${residentialComplexId}/apartments/${apartmentId}`,
} as const;
