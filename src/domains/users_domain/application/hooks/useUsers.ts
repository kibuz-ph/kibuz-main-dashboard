import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    activateUser,
    createUser,
    deleteUser,
    getUserById,
    getUsers,
    updateUser,
    type GetUsersParams,
} from "@/domains/users_domain/infrastructure/api/usersApi";
import type { CreateUserPayload, UpdateUserPayload } from "@/domains/users_domain/application/constants/types";
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

export const useUser = (id?: string) => {
    return useQuery({
        queryKey: userKeys.detail(id ?? ""),
        queryFn: () => getUserById(id as string),
        enabled: Boolean(id),
    });
};

export const useCreateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (body: CreateUserPayload) => createUser(body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.lists() });
        },
    });
};

export const useUpdateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, body }: { id: string; body: UpdateUserPayload }) => updateUser(id, body),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: userKeys.lists() });
            queryClient.invalidateQueries({ queryKey: userKeys.detail(variables.id) });
        },
    });
};

export const useDeleteUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => deleteUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.lists() });
        },
    });
};

export const useActivateUser = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: string) => activateUser(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: userKeys.lists() });
        },
    });
};
