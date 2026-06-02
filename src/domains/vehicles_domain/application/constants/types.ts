export type PaginationMeta = {
    page: number;
    perPage: number;
    total: number;
    totalPages?: number;
};

export type Vehicle = {
    id: string;
    plate?: string;
    type?: string;
    brand?: string;
    model?: string;
    color?: string;
    apartmentId?: string;
};

export type VehiclesResponse = {
    message?: string;
    success?: boolean;
    data: Vehicle[];
};

export type VehiclesPaginatedResponse = {
    data: Vehicle[];
    page?: number;
    perPage?: number;
    total?: number;
    totalPages?: number;
    meta?: PaginationMeta;
};

export type VehicleRow = {
    plate: string;
    type: string;
    brand: string;
    model: string;
    color: string;
    apartmentId: string;
};
