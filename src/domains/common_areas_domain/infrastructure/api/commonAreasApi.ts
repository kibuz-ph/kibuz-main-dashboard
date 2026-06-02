import { apiHandler } from "@/shared/infrastructure/api/apiHandler";
import type {
    CommonArea,
    CommonAreasResponse,
    CreateCommonAreaBody,
    CreateCommonAreaForm,
    CreateCommonAreaResponse,
} from "../../application/constants/types";
import { API_ROUTES } from "./routesApi";

type CommonAreasApiPayload =
    | CommonAreasResponse
    | {
          data?: CommonArea[] | CommonAreasResponse;
          items?: CommonArea[];
      }
    | CommonArea[];

const normalizeCommonAreasResponse = (payload: CommonAreasApiPayload): CommonAreasResponse => {
    if (Array.isArray(payload)) {
        return { items: payload };
    }

    if (Array.isArray(payload.items)) {
        return { items: payload.items };
    }

    const nestedData = "data" in payload ? payload.data : undefined;

    if (Array.isArray(nestedData)) {
        return { items: nestedData };
    }

    if (nestedData && typeof nestedData === "object" && "items" in nestedData && Array.isArray(nestedData.items)) {
        return { items: nestedData.items };
    }

    return { items: [] };
};

export const getResidentialComplexCommonAreas = (id: string) => {
    return apiHandler<CommonAreasApiPayload>(API_ROUTES.COMMON_AREAS_BY_RESIDENTIAL_COMPLEX(id)).then(
        normalizeCommonAreasResponse
    );
};

export const createResidentialComplexCommonArea = (
    id: string,
    body: CreateCommonAreaForm
) => {
    const payloadCandidates: CreateCommonAreaBody[] = [
        {
            items: body.name,
            icon: body.icon,
            description: body.description,
        },
        {
            name: body.name,
            icon: body.icon,
            description: body.description,
        },
        {
            items: [
                {
                    name: body.name,
                    icon: body.icon,
                    description: body.description,
                },
            ],
        },
    ];

    const attemptRequest = async (index: number): Promise<CreateCommonAreaResponse> => {
        const payload = payloadCandidates[index];

        try {
            return await apiHandler<CreateCommonAreaResponse, CreateCommonAreaBody>(
                API_ROUTES.COMMON_AREAS_BY_RESIDENTIAL_COMPLEX(id),
                {
                    method: "POST",
                    body: payload,
                }
            );
        } catch (error) {
            if (index >= payloadCandidates.length - 1) {
                throw error;
            }

            return attemptRequest(index + 1);
        }
    };

    return attemptRequest(0);
};
