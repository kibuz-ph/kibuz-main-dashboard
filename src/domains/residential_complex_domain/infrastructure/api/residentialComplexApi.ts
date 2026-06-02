import { API_ROUTES } from "./routesApi";
import type {
    ResidentialComplex,
    ResidentialComplexesResponse,
    UpdateResidentialComplexBody,
    UpdateResidentialComplexResponse,
} from "../../application/constants/types";
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

export const updateResidentialComplex = (id: string, body: UpdateResidentialComplexBody) => {
    return apiHandler<UpdateResidentialComplexResponse, UpdateResidentialComplexBody>(
        API_ROUTES.UPDATE_RESIDENTIAL_COMPLEX(id),
        {
            method: "PATCH",
            body,
        }
    );
};
