// import { apiRequest } from "../../../../shared/infrastructure/api";
import { API_ROUTES } from "./routesApi";
import type { Login, LoginResponse } from "../../application/constants/types";
import { handleResponse } from "@/shared/infrastructure/api/apiHandler";

const apiHeader = {
    'Accept': 'application/json',
    'Content-type': 'application/json',
};

// export const getUsers = async () => {
//     const response = await apiRequest({
//         endpoint: "/users",
//     });

//     if (!response.ok) {
//         console.error(response.error);
//         return;
//     }

//     console.log(response.data);
// };


// export const login = async (data: Login) => {
//     const response = await apiRequest<LoginResponse>({
//         endpoint: API_ROUTES.LOGIN,
//         method: 'POST',
//         body: data
//     });

//     if (!response.ok || !response.data) {
//         console.error(response.error);
//         return;
//     }

//     localStorage.setItem("token", response.data.token);
//     console.log(response.data);

//     return response.data;
// };

export const authLogin = async (data: Login): Promise<LoginResponse> => {
    const requestOptions: RequestInit = {
        method: "POST",
        headers: apiHeader,
        body: JSON.stringify(data),
    };

    const response = await fetch(API_ROUTES.LOGIN, requestOptions);

    return handleResponse<LoginResponse>(response);
};