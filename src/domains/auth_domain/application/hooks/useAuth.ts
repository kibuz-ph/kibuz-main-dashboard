// shared/application/hooks/useAuth.ts

import { useQuery } from "@tanstack/react-query";
import { checkAuth } from "@/domains/auth_domain/infrastructure/api/authApi";
import { authKeys } from "../queries/authKeys";

export const useAuth = () => {
    return useQuery({
        queryKey: authKeys.me(),
        queryFn: checkAuth,
        retry: false,
        staleTime: 1000 * 60 * 5, // 5 minutes
    });
};