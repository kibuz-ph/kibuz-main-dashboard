import BASE_URL from "@/shared/infrastructure/api/backend-urls";

export const API_ROUTES = {
    USERS: `${BASE_URL}users`,
    USER_BY_ID: (id: string) => `${BASE_URL}users/${id}`,
    ACTIVATE_USER: (id: string) => `${BASE_URL}users/activate-user/${id}`,
} as const;
