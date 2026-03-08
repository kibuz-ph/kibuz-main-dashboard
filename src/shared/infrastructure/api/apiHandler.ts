export const authHeader = () => {
    const token = localStorage.getItem('token');

    return {
        'Accept': 'application/json',
        'Content-type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
};

// export const handleResponse = (response) => {
//     return response.json().then((data) => {
//         if (!response.ok) {
//             let error = (data && (data.error || data.message));

//             if (response.status === 400) {
//                 error = 'El usuario no está registrado';
//             }

//             if (response.status === 404) {
//                 error = 'NOT_FOUND';
//             }

//             return Promise.reject(data?.error_type ? data : error);
//         }

//         return data;
//     });
// };

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