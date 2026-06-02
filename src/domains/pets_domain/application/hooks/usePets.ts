import { useQuery } from "@tanstack/react-query";
import { getPets, type GetPetsParams } from "@/domains/pets_domain/infrastructure/api/petsApi";
import { petKeys } from "../queries/petKeys";

export const usePets = ({ page, perPage }: GetPetsParams = {}) => {
    return useQuery({
        queryKey: [...petKeys.lists(), page, perPage],
        queryFn: () => getPets({ page, perPage }),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        retry: 2,
    });
};
