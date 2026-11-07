import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createApartments,
    deleteApartment,
    getApartmentById,
    getApartments,
    updateApartment,
    type ApartmentIdentifier,
    type GetApartmentsParams,
} from "@/domains/apartments_domain/infrastructure/api/apartmentsApi";
import type {
    CreateApartmentsPayload,
    UpdateApartmentPayload,
} from "@/domains/apartments_domain/application/constants/types";
import { apartmentKeys } from "../queries/apartmentKeys";

type UseApartmentsParams = Omit<GetApartmentsParams, "residentialComplexId"> & {
    residentialComplexId?: string;
};

export const useApartments = ({ residentialComplexId, ...params }: UseApartmentsParams) => {
    return useQuery({
        queryKey: [...apartmentKeys.lists(), residentialComplexId, params],
        queryFn: () => getApartments({ residentialComplexId: residentialComplexId as string, ...params }),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        retry: 2,
        enabled: Boolean(residentialComplexId),
        placeholderData: keepPreviousData,
    });
};

// Solo se necesita pagination.totalItems: se pide 1 item para no traer la lista completa
export const useApartmentsTotal = (residentialComplexId?: string) => {
    const { data, ...query } = useApartments({ residentialComplexId, page: 1, perPage: 1 });

    return { ...query, total: data?.pagination.totalItems ?? 0 };
};

export const useApartment = ({ residentialComplexId, apartmentId }: Partial<ApartmentIdentifier>) => {
    return useQuery({
        queryKey: apartmentKeys.detail(apartmentId ?? ""),
        queryFn: () =>
            getApartmentById({
                residentialComplexId: residentialComplexId as string,
                apartmentId: apartmentId as string,
            }),
        enabled: Boolean(residentialComplexId && apartmentId),
    });
};

export const useCreateApartments = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ residentialComplexId, body }: { residentialComplexId: string; body: CreateApartmentsPayload }) =>
            createApartments(residentialComplexId, body),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: apartmentKeys.lists() });
        },
    });
};

export const useUpdateApartment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ identifier, body }: { identifier: ApartmentIdentifier; body: UpdateApartmentPayload }) =>
            updateApartment(identifier, body),
        onSuccess: (_data, variables) => {
            queryClient.invalidateQueries({ queryKey: apartmentKeys.lists() });
            queryClient.invalidateQueries({ queryKey: apartmentKeys.detail(variables.identifier.apartmentId) });
        },
    });
};

export const useDeleteApartment = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (identifier: ApartmentIdentifier) => deleteApartment(identifier),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: apartmentKeys.lists() });
        },
    });
};
