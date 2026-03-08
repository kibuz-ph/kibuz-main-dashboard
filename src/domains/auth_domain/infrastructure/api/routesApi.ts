import BASE_URL from '@/shared/infrastructure/api/backend-urls'

export const API_ROUTES = {
    LOGIN: `${BASE_URL}auth/login`,
    REGISTER: `${BASE_URL}auth/register`,
} as const;