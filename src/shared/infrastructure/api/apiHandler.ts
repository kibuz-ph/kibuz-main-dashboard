import type { RequestOptions } from "@/shared/application/constants/types/api";

export const apiHandler = async <TResponse, TBody = unknown>(
    endpoint: string,
    options: RequestOptions<TBody> = {}
): Promise<TResponse> => {
    const { method = "GET", body } = options;

    const response = await fetch(endpoint, {
        method,
        credentials: "include",
        headers: {
        "Content-Type": "application/json",
        },
        ...(body && { body: JSON.stringify(body) }),
    });

    if (!response.ok) {
        const error = await response.json();
        throw {
            status: response.status,
            ...error,
        };
    }

    return response.json();
};