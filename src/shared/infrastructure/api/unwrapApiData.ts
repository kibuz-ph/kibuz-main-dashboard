// El backend envuelve la mayoria de respuestas en { message, success, data }, aunque
// el Swagger documenta solo el contenido de `data`. Acepta ambas formas.
export type ApiEnvelope<T> = {
    message?: string;
    success?: boolean;
    data: T;
};

export const unwrapApiData = <T>(payload: T | ApiEnvelope<T>): T => {
    if (payload && typeof payload === "object" && !Array.isArray(payload) && "data" in payload) {
        return (payload as ApiEnvelope<T>).data;
    }

    return payload as T;
};
