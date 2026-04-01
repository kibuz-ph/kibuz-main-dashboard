import { API_ROUTES } from "./routesApi";
import type { ResidentialComplex, ResidentialComplexesResponse } from "../../application/constants/types";
import { apiHandler } from "@/shared/infrastructure/api/apiHandler";

// GET all residential complexes
export const getResidentialComplexes = () => {
    return apiHandler<ResidentialComplex[]>(API_ROUTES.RESIDENTIAL_COMPLEXES);
};

// GET my residential complexes
export const getMyResidentialComplexes = () => {
    return apiHandler<ResidentialComplexesResponse>(
        API_ROUTES.MY_RESIDENTIAL_COMPLEXES
    );
};