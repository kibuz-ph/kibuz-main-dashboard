import { apiHandler } from "@/shared/infrastructure/api/apiHandler";
import { unwrapApiData, type ApiEnvelope } from "@/shared/infrastructure/api/unwrapApiData";
import type {
    Apartment,
    ApartmentFilters,
    ApartmentsPaginatedResponse,
    CreateApartmentsPayload,
    PaginationMetadata,
    UpdateApartmentPayload,
} from "../../application/constants/types";
import { API_ROUTES } from "./routesApi";

export type GetApartmentsParams = ApartmentFilters & {
    residentialComplexId: string;
    page: number;
    perPage: number;
};

export type ApartmentIdentifier = {
    residentialComplexId: string;
    apartmentId: string;
};

type ApartmentsApiPayload =
    | ApartmentsPaginatedResponse
    | ApiEnvelope<ApartmentsPaginatedResponse>
    | (ApiEnvelope<Apartment[]> & { pagination?: PaginationMetadata })
    | Apartment[];

const buildFallbackPagination = (items: Apartment[], page: number, perPage: number): PaginationMetadata => ({
    currentPage: page,
    perPage,
    totalPages: 1,
    totalItems: items.length,
    hasPage: false,
});

const normalizeApartmentsResponse = (
    payload: ApartmentsApiPayload,
    page: number,
    perPage: number
): ApartmentsPaginatedResponse => {
    const content = unwrapApiData<ApartmentsPaginatedResponse | Apartment[]>(payload);
    const items = Array.isArray(content) ? content : content?.items ?? [];
    const pagination =
        (!Array.isArray(content) && content?.pagination) ||
        (!Array.isArray(payload) && "pagination" in payload && payload.pagination) ||
        buildFallbackPagination(items, page, perPage);

    return { items, pagination };
};

const buildApartmentsSearchParams = ({ page, perPage, floor, reference, size }: Omit<GetApartmentsParams, "residentialComplexId">) => {
    const searchParams = new URLSearchParams({
        page: page.toString(),
        perPage: perPage.toString(),
    });

    if (floor !== undefined) searchParams.set("floor", floor.toString());
    if (reference) searchParams.set("reference", reference);
    if (size) searchParams.set("size", size);

    return searchParams.toString();
};

// GET residential complex's apartments (paginated)
export const getApartments = async ({ residentialComplexId, ...params }: GetApartmentsParams) => {
    const payload = await apiHandler<ApartmentsApiPayload>(
        `${API_ROUTES.APARTMENTS(residentialComplexId)}?${buildApartmentsSearchParams(params)}`
    );

    return normalizeApartmentsResponse(payload, params.page, params.perPage);
};

// GET apartment by id
export const getApartmentById = async ({ residentialComplexId, apartmentId }: ApartmentIdentifier) => {
    const payload = await apiHandler<Apartment | ApiEnvelope<Apartment>>(
        API_ROUTES.APARTMENT_BY_ID(residentialComplexId, apartmentId)
    );

    return unwrapApiData(payload);
};

// POST create apartments (bulk)
export const createApartments = (residentialComplexId: string, body: CreateApartmentsPayload) => {
    return apiHandler<void, CreateApartmentsPayload>(API_ROUTES.APARTMENTS(residentialComplexId), {
        method: "POST",
        body,
    });
};

// PATCH update apartment
export const updateApartment = ({ residentialComplexId, apartmentId }: ApartmentIdentifier, body: UpdateApartmentPayload) => {
    return apiHandler<void, UpdateApartmentPayload>(API_ROUTES.APARTMENT_BY_ID(residentialComplexId, apartmentId), {
        method: "PATCH",
        body,
    });
};

// DELETE apartment
export const deleteApartment = ({ residentialComplexId, apartmentId }: ApartmentIdentifier) => {
    return apiHandler<void>(API_ROUTES.APARTMENT_BY_ID(residentialComplexId, apartmentId), {
        method: "DELETE",
    });
};
