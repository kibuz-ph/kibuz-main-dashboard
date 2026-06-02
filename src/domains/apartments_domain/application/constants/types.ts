export type ApartmentStatus = "Ocupado" | "Disponible" | "Reservado";

export type AssetStatus = "Asignado" | "Disponible";

export type VehicleStatus = "Activo" | "Visitante";

export type PetStatus = "Registrada" | "Pendiente";

export type ApartmentRow = {
    id: string;
    name: string;
    tower: string;
    floor: string;
    owner: string;
    residents: number;
    parkingLots: number;
    vehicles: number;
    storageRooms: number;
    pets: number;
    status: ApartmentStatus;
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
