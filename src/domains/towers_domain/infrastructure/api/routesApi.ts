import BASE_URL from "@/shared/infrastructure/api/backend-urls";

export const API_ROUTES = {
    TOWERS_BY_RESIDENTIAL_COMPLEX: (residentialComplexId: string) =>
        `${BASE_URL}residential-complexes/${residentialComplexId}/towers`,
} as const;
