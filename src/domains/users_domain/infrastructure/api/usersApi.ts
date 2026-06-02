import { API_ROUTES } from "./routesApi";
import type { UsersPaginatedResponse } from "../../application/constants/types";
import { apiHandler } from "@/shared/infrastructure/api/apiHandler";

export type GetUsersParams = {
    page: number;
    perPage: number;
};

// GET all users (paginated)
export const getUsers = ({ page, perPage }: GetUsersParams) => {
    const searchParams = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
    });

    return apiHandler<UsersPaginatedResponse>(`${API_ROUTES.USERS}?${searchParams.toString()}`);
};
