import { apiRequest } from "../../../../shared/infrastructure/api";
import { API_ROUTES } from "./routesApi";
import type { Login, LoginResponse } from "../../application/types";

export const getUsers = async () => {
    const response = await apiRequest({
        endpoint: "/users",
    });

    if (!response.ok) {
        console.error(response.error);
        return;
    }

    console.log(response.data);
};


export const login = async (data: Login) => {
    const response = await apiRequest<LoginResponse>({
        endpoint: API_ROUTES.LOGIN,
        method: 'POST',
        body: data
    });

    if (!response.ok || !response.data) {
        console.error(response.error);
        return;
    }

    localStorage.setItem("token", response.data.token);
    console.log(response.data);

    return response.data;
};