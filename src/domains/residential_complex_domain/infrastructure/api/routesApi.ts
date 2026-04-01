import BASE_URL from '@/shared/infrastructure/api/backend-urls'

export const API_ROUTES = {
    RESIDENTIAL_COMPLEXES: `${BASE_URL}residential-complexes`,
    MY_RESIDENTIAL_COMPLEXES: `${BASE_URL}residential-complexes/me`,
} as const;