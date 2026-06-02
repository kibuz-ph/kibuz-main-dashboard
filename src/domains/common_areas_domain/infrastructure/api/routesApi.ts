import BASE_URL from "@/shared/infrastructure/api/backend-urls";

export const API_ROUTES = {
    COMMON_AREAS_BY_RESIDENTIAL_COMPLEX: (id: string) => `${BASE_URL}residential-complexes/${id}/common-areas`,
} as const;
