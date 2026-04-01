import { API_ROUTES } from "./routesApi";
import type { Login, LoginResponse, User } from "@/domains/auth_domain/application/constants/types";
import { apiHandler } from "@/shared/infrastructure/api/apiHandler";

export const authLogin = (data: Login) => {
    return apiHandler<LoginResponse, Login>(API_ROUTES.LOGIN, {
        method: "POST",
        body: data,
    });
};

export const checkAuth = async () => {
    return apiHandler<User>(API_ROUTES.CHECK_AUTH);
};

export const logout = () => {
    return apiHandler(API_ROUTES.LOGOUT, {
        method: "POST",
    });
};