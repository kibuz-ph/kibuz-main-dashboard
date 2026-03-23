import { API_ROUTES } from "./routesApi";
import type { ResidentialComplex } from "../../application/constants/types";
import { apiHandler } from "@/shared/infrastructure/api/apiHandler";

// GET
export const getResidentialComplexes = () => {
    return apiHandler<ResidentialComplex[]>(API_ROUTES.RESIDENTIAL_COMPLEXES);
};