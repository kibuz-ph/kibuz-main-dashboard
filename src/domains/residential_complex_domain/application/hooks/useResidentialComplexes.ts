import { useQuery } from "@tanstack/react-query";
import { getMyResidentialComplexes, getResidentialComplexes } from "@/domains/residential_complex_domain/infrastructure/api/residentialComplexApi";
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