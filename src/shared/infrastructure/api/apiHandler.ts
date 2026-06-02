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

    const rawText = await response.text();
    const parsedBody = rawText ? (() => {
        try {
            return JSON.parse(rawText) as unknown;
        } catch {
            return rawText;
        }
    })() : null;

    if (!response.ok) {
        const error =
            parsedBody && typeof parsedBody === "object"
                ? parsedBody
                : {
                      message: typeof parsedBody === "string" && parsedBody.length > 0
                          ? parsedBody
                          : `Request failed with status ${response.status}`,
                  };

        throw {
            status: response.status,
            ...error,
        };
    }

    return (parsedBody ?? ({} as TResponse)) as TResponse;
};
