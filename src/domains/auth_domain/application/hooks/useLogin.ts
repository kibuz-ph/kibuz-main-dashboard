import { useMutation, useQueryClient } from "@tanstack/react-query";
import { authLogin, checkAuth } from "@/domains/auth_domain/infrastructure/api/authApi";
import { authKeys } from "../queries/authKeys";

export const useLogin = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: authLogin,

        onSuccess: async () => {
        // 🔥 CLAVE: traer usuario DESPUÉS del login
        const user = await checkAuth();

        // 🔥 guardar en cache
        queryClient.setQueryData(authKeys.me(), user);
        },
    });
};