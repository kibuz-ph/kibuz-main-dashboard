import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
    createResidentialComplexCommonArea,
    getResidentialComplexCommonAreas,
} from "@/domains/common_areas_domain/infrastructure/api/commonAreasApi";
import type { CreateCommonAreaForm } from "../constants/types";
import { commonAreaKeys } from "../queries/commonAreaKeys";

export const useCommonAreas = (residentialComplexId?: string) => {
    return useQuery({
        queryKey: [...commonAreaKeys.lists(), residentialComplexId],
        queryFn: () => getResidentialComplexCommonAreas(residentialComplexId as string),
        enabled: Boolean(residentialComplexId),
    });
};

export const useCreateCommonArea = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            residentialComplexId,
            body,
        }: {
            residentialComplexId: string;
            body: CreateCommonAreaForm;
        }) => createResidentialComplexCommonArea(residentialComplexId, body),
        onSuccess: (_response, variables) => {
            queryClient.invalidateQueries({
                queryKey: [...commonAreaKeys.lists(), variables.residentialComplexId],
            });
        },
    });
};
