export type PaginationMeta = {
    page: number;
    perPage: number;
    total: number;
    totalPages?: number;
};

export type Pet = {
    id: string;
    name?: string;
    type?: string;
    breed?: string;
    apartmentId?: string;
};

export type PetsResponse = {
    message?: string;
    success?: boolean;
    data: Pet[];
};

export type PetsPaginatedResponse = {
    data: Pet[];
    page?: number;
    perPage?: number;
    total?: number;
    totalPages?: number;
    meta?: PaginationMeta;
};
