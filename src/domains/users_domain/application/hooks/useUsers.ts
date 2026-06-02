import { useQuery } from "@tanstack/react-query";
import { getUsers, type GetUsersParams } from "@/domains/users_domain/infrastructure/api/usersApi";
import { userKeys } from "../queries/userKeys";

export const useUsers = ({ page, perPage }: GetUsersParams) => {
    return useQuery({
        queryKey: [...userKeys.lists(), page, perPage],
        queryFn: () => getUsers({ page, perPage }),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        retry: 2,
    });
};
