export interface RequestConfig<B = unknown> {
    endpoint: string;
    method?: "GET" | "POST" | "PUT" | "PATCH" | "DELETE";
    body?: B;
    requiresAuth?: boolean;
    headers?: HeadersInit;
}

export interface ApiResponse<T> {
    ok: boolean;
    status: number;
    data: T | null;
    error: string | null;
}

export type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

export interface RequestOptions<T> {
    method?: HttpMethod;
    body?: T;
}