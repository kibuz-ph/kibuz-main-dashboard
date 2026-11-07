import type { Tower } from "@/domains/towers_domain/application/constants/types";

export type AssetStatus = "Asignado" | "Disponible";

export type VehicleStatus = "Activo" | "Visitante";

export type PetStatus = "Registrada" | "Pendiente";

export type PaginationMetadata = {
    currentPage: number;
    perPage: number;
    totalPages: number;
    totalItems: number;
    hasPage: boolean;
};

export type Apartment = {
    id: string;
    floor: number;
    reference: string;
    size: string;
    towerId: string;
    residentialComplexId: string;
    tower: Tower | null;
};

export type ApartmentsPaginatedResponse = {
    items: Apartment[];
    pagination: PaginationMetadata;
};

export type ApartmentFilters = {
    floor?: number;
    reference?: string;
    size?: string;
};

export type ApartmentPayload = {
    floor: number;
    reference: string;
    size: string;
    towerId: string;
};

export type CreateApartmentsPayload = {
    items: ApartmentPayload[];
};

export type UpdateApartmentPayload = Partial<ApartmentPayload>;

export type ApartmentRow = {
    id: string;
    reference: string;
    floor: number;
    size: string;
    towerId: string;
    tower: string;
};

export type ParkingLotRow = {
    id: string;
    apartmentId: string;
    apartment: string;
    code: string;
    type: string;
    assignedTo: string;
    status: AssetStatus;
};

export type ApartmentVehicleRow = {
    id: string;
    apartmentId: string;
    apartment: string;
    plate: string;
    type: string;
    brand: string;
    color: string;
    status: VehicleStatus;
};

export type StorageRoomRow = {
    id: string;
    apartmentId: string;
    apartment: string;
    code: string;
    level: string;
    area: string;
    status: AssetStatus;
};

export type ApartmentPetRow = {
    id: string;
    apartmentId: string;
    apartment: string;
    name: string;
    type: string;
    breed: string;
    caretaker: string;
    status: PetStatus;
};
