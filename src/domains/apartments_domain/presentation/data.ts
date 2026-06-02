import type {
    ApartmentPetRow,
    ApartmentRow,
    ApartmentVehicleRow,
    ParkingLotRow,
    StorageRoomRow,
} from "../application/constants/types";

const TOWERS = ["Torre 1", "Torre 2", "Torre 3"];
const OWNER_NAMES = [
    "Valentina Torres",
    "Camilo Rios",
    "Daniela Mejia",
    "Sebastian Gomez",
    "Laura Castillo",
    "Andres Munoz",
    "Isabella Ramirez",
    "Felipe Herrera",
    "Sofia Lopez",
    "Juan Perez",
    "Juliana Moreno",
    "Mateo Vargas",
];
const VEHICLE_TYPES = ["Carro", "Moto", "Bicicleta"];
const VEHICLE_BRANDS = ["Mazda", "Renault", "Kia", "Toyota", "Chevrolet"];
const VEHICLE_COLORS = ["Blanco", "Negro", "Gris", "Rojo", "Azul"];
const PET_TYPES = ["Perro", "Gato"];
const PET_BREEDS = ["Labrador", "Criollo", "Persa", "Beagle", "Siames"];
const PET_NAMES = ["Luna", "Max", "Milo", "Nala", "Toby", "Kira", "Bruno", "Mia"];
const PARKING_TYPES = ["Cubierto", "Descubierto", "Moto"];

export const APARTMENTS: ApartmentRow[] = Array.from({ length: 12 }, (_, index) => {
    const floor = Math.floor(index / 4) + 1;
    const unit = (index % 4) + 1;
    const name = `Apto ${floor}${unit.toString().padStart(2, "0")}`;
    const status = index % 5 === 0 ? "Disponible" : index % 4 === 0 ? "Reservado" : "Ocupado";
    const vehicles = index % 3;
    const parkingLots = Math.max(1, vehicles || 1);
    const storageRooms = index % 2 === 0 ? 1 : 0;
    const pets = index % 4 === 0 ? 2 : index % 3 === 0 ? 1 : 0;

    return {
        id: `apartment-${floor}${unit.toString().padStart(2, "0")}`,
        name,
        tower: TOWERS[index % TOWERS.length],
        floor: `Piso ${floor}`,
        owner: OWNER_NAMES[index % OWNER_NAMES.length],
        residents: 2 + (index % 4),
        parkingLots,
        vehicles,
        storageRooms,
        pets,
        status,
    };
});

export const PARKING_LOTS: ParkingLotRow[] = APARTMENTS.flatMap((apartment, apartmentIndex) =>
    Array.from({ length: apartment.parkingLots }, (_, slotIndex) => ({
        id: `${apartment.id}-parking-${slotIndex + 1}`,
        apartmentId: apartment.id,
        apartment: apartment.name,
        code: `PQ-${apartmentIndex + 1}${slotIndex + 1}`,
        type: PARKING_TYPES[(apartmentIndex + slotIndex) % PARKING_TYPES.length],
        assignedTo: apartment.owner,
        status: apartment.status === "Disponible" ? "Disponible" : "Asignado",
    }))
);

export const APARTMENT_VEHICLES: ApartmentVehicleRow[] = APARTMENTS.flatMap((apartment, apartmentIndex) =>
    Array.from({ length: apartment.vehicles }, (_, vehicleIndex) => ({
        id: `${apartment.id}-vehicle-${vehicleIndex + 1}`,
        apartmentId: apartment.id,
        apartment: apartment.name,
        plate: `KBZ${apartmentIndex + 1}${vehicleIndex + 2}`,
        type: VEHICLE_TYPES[(apartmentIndex + vehicleIndex) % VEHICLE_TYPES.length],
        brand: VEHICLE_BRANDS[(apartmentIndex + vehicleIndex) % VEHICLE_BRANDS.length],
        color: VEHICLE_COLORS[(apartmentIndex + vehicleIndex) % VEHICLE_COLORS.length],
        status: vehicleIndex % 2 === 0 ? "Activo" : "Visitante",
    }))
);

export const STORAGE_ROOMS: StorageRoomRow[] = APARTMENTS.flatMap((apartment, apartmentIndex) =>
    Array.from({ length: apartment.storageRooms }, (_, storageIndex) => ({
        id: `${apartment.id}-storage-${storageIndex + 1}`,
        apartmentId: apartment.id,
        apartment: apartment.name,
        code: `CU-${apartmentIndex + 1}${storageIndex + 1}`,
        level: `Sotano ${((apartmentIndex + storageIndex) % 2) + 1}`,
        area: `${2 + ((apartmentIndex + storageIndex) % 3)} m2`,
        status: apartment.status === "Disponible" ? "Disponible" : "Asignado",
    }))
);

export const APARTMENT_PETS: ApartmentPetRow[] = APARTMENTS.flatMap((apartment, apartmentIndex) =>
    Array.from({ length: apartment.pets }, (_, petIndex) => ({
        id: `${apartment.id}-pet-${petIndex + 1}`,
        apartmentId: apartment.id,
        apartment: apartment.name,
        name: PET_NAMES[(apartmentIndex + petIndex) % PET_NAMES.length],
        type: PET_TYPES[(apartmentIndex + petIndex) % PET_TYPES.length],
        breed: PET_BREEDS[(apartmentIndex + petIndex) % PET_BREEDS.length],
        caretaker: apartment.owner,
        status: petIndex % 2 === 0 ? "Registrada" : "Pendiente",
    }))
);
