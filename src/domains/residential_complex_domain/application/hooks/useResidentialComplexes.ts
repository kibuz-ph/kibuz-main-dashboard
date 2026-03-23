import { useQuery } from "@tanstack/react-query";
import { getResidentialComplexes } from "../../infrastructure/api/residentialComplexApi";
import { residentialComplexKeys } from "../queries/residentialComplexKeys";

export const useResidentialComplexes = () => {
    return useQuery({
        queryKey: residentialComplexKeys.lists(),
        queryFn: getResidentialComplexes,
    });
};