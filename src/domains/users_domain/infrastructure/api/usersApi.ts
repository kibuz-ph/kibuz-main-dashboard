import { API_ROUTES } from "./routesApi";
import type { CreateUserPayload, UpdateUserPayload, User, UsersPaginatedResponse } from "../../application/constants/types";
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

// GET user by id
export const getUserById = (id: string) => {
    return apiHandler<User>(API_ROUTES.USER_BY_ID(id));
};

// POST create user
export const createUser = (body: CreateUserPayload) => {
    return apiHandler<User, CreateUserPayload>(API_ROUTES.USERS, {
        method: "POST",
        body,
    });
};

// PATCH update user
export const updateUser = (id: string, body: UpdateUserPayload) => {
    return apiHandler<User, UpdateUserPayload>(API_ROUTES.USER_BY_ID(id), {
        method: "PATCH",
        body,
    });
};

// DELETE user
export const deleteUser = (id: string) => {
    return apiHandler<void>(API_ROUTES.USER_BY_ID(id), {
        method: "DELETE",
    });
};

// PATCH activate user
export const activateUser = (id: string) => {
    return apiHandler<User>(API_ROUTES.ACTIVATE_USER(id), {
        method: "PATCH",
    });
};
