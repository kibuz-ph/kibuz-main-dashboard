import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/domains/auth_domain/infrastructure/api/authApi";
import { authKeys } from "../queries/authKeys";

export const useLogout = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: logout,

        onSuccess: () => {
            // 🔥 borrar usuario del cache
            queryClient.removeQueries({
                queryKey: authKeys.all,
            });

            // 🔥 opcional: limpiar TODO el cache
            queryClient.clear();
        },
    });
};