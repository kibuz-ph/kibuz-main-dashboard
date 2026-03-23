// export const authHeader = () => {
//     const token = localStorage.getItem('token');

//     return {
//         'Accept': 'application/json',
//         'Content-type': 'application/json',
//         'Authorization': `Bearer ${token}`
//     }
// };

export const AUTH_HEADER = {
    'Accept': 'application/json',
    'Content-type': 'application/json',
};

export const COOKIES_CREDENTIALS = "include";

export const handleResponse = async <T>(response: Response): Promise<T> => {
    const data = await response.json().catch(() => null);

    if (!response.ok) {
        const error =
        response.status === 400
            ? "El usuario no está registrado"
            : response.status === 404
            ? "NOT_FOUND"
            : data?.error || data?.message || "Error en la petición";

        throw error;
    }

    return data as T;
}