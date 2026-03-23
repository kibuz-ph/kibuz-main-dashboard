import { API_ROUTES } from "./routesApi";
import type { Login, LoginResponse, User } from "@/domains/auth_domain/application/constants/types";
// import { COOKIES_CREDENTIALS, handleResponse } from "@/shared/infrastructure/api/apiHandler_old";
import { apiHandler } from "@/shared/infrastructure/api/apiHandler";

// const apiHeader = {
//     'Accept': 'application/json',
//     'Content-type': 'application/json',
// };

// export const authLogin = async (data: Login): Promise<LoginResponse> => {
//     const requestOptions: RequestInit = {
//         method: "POST",
//         headers: apiHeader,
//         body: JSON.stringify(data),
//         credentials: COOKIES_CREDENTIALS
//     };

//     const response = await fetch(API_ROUTES.LOGIN, requestOptions);

//     return handleResponse<LoginResponse>(response);
// };

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