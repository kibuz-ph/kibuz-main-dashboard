import { useQuery } from "@tanstack/react-query";
import { getUsers } from "@/domains/users_domain/infrastructure/api/usersApi";
import { userKeys } from "../queries/userKeys";

export const useUsers = () => {
    return useQuery({
        queryKey: userKeys.lists(),
        queryFn: getUsers,
    });
};
