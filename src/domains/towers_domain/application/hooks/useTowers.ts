import { useQuery } from "@tanstack/react-query";
import { getTowers } from "@/domains/towers_domain/infrastructure/api/towersApi";
import { towerKeys } from "../queries/towerKeys";

export const useTowers = (residentialComplexId?: string) => {
    return useQuery({
        queryKey: [...towerKeys.lists(), residentialComplexId],
        queryFn: () => getTowers(residentialComplexId as string),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        retry: 2,
        enabled: Boolean(residentialComplexId),
    });
};
