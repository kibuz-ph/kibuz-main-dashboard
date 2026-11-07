import { apiHandler } from "@/shared/infrastructure/api/apiHandler";
import { unwrapApiData, type ApiEnvelope } from "@/shared/infrastructure/api/unwrapApiData";
import type { Tower, TowersResponse } from "../../application/constants/types";
import { API_ROUTES } from "./routesApi";

// GET residential complex's towers
export const getTowers = async (residentialComplexId: string): Promise<TowersResponse> => {
    const payload = await apiHandler<TowersResponse | ApiEnvelope<TowersResponse | Tower[]> | Tower[]>(
        API_ROUTES.TOWERS_BY_RESIDENTIAL_COMPLEX(residentialComplexId)
    );
    const content = unwrapApiData<TowersResponse | Tower[]>(payload);

    return { items: Array.isArray(content) ? content : content?.items ?? [] };
};
