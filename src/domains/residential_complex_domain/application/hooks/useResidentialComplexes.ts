import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    getMyResidentialComplexes,
    getResidentialComplexes,
    updateResidentialComplex,
} from "@/domains/residential_complex_domain/infrastructure/api/residentialComplexApi";
import type { UpdateResidentialComplexBody } from "../constants/types";
import { residentialComplexKeys } from "../queries/residentialComplexKeys";

export const useResidentialComplexes = () => {
    return useQuery({
        queryKey: residentialComplexKeys.lists(),
        queryFn: getResidentialComplexes,
    });
};

export const useMyResidentialComplexes = (enabled: boolean) => {
    return useQuery({
        queryKey: ["my-residential-complexes"],
        queryFn: getMyResidentialComplexes,
        enabled,
    });
};

export const useUpdateResidentialComplex = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({ id, body }: { id: string; body: UpdateResidentialComplexBody }) =>
            updateResidentialComplex(id, body),
        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: residentialComplexKeys.all,
            });
            queryClient.invalidateQueries({
                queryKey: ["my-residential-complexes"],
            });
        },
    });
};
