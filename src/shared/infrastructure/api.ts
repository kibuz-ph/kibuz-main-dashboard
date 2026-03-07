import type { RequestConfig, ApiResponse } from "../application/constants/types/api";

const BASE_URL = import.meta.env.VITE_URL_API_DEV;

export async function apiRequest<T, B = unknown>({
    endpoint,
    method = "GET",
    body,
    requiresAuth = false,
    headers = {},
}: RequestConfig<B>): Promise<ApiResponse<T>> {
    const token = localStorage.getItem("token");

    try {
        const response = await fetch(`${BASE_URL}${endpoint}`, {
        method,
        headers: {
            "Content-Type": "application/json",
            ...(requiresAuth && token
            ? { Authorization: `Bearer ${token}` }
            : {}),
            ...headers,
        },
        body: body ? JSON.stringify(body) : undefined,
        });

        const data = await response.json();

        return {
        ok: response.ok,
        status: response.status,
        data: response.ok ? (data as T) : null,
        error: response.ok ? null : data?.message ?? "Error en la petición",
        };
    } catch (error) {
        return {
        ok: false,
        status: 500,
        data: null,
        error: error instanceof Error ? error.message : "Error desconocido",
        };
    }
}