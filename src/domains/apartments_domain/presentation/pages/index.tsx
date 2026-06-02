import { useMemo, useState } from "react";
import { APP_TEXT, TITLE_MODULE } from "@/shared/application/constants/appData";
import HeaderButton from "@/shared/presentation/components/HeaderButton";
import DataTable from "@/shared/presentation/components/DataTable";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type {
    ApartmentPetRow,
    ApartmentRow,
    ApartmentVehicleRow,
    ParkingLotRow,
    StorageRoomRow,
} from "@/domains/apartments_domain/application/constants/types";
import {
    APARTMENTS,
    APARTMENT_PETS,
    APARTMENT_VEHICLES,
    PARKING_LOTS,
    STORAGE_ROOMS,
} from "../data";
import { apartmentsColumns } from "../components/ApartmentsTable/apartmentsColumns";
import { parkingLotsColumns } from "../components/ParkingLotsTable/parkingLotsColumns";
import { apartmentVehiclesColumns } from "../components/VehiclesTable/vehiclesColumns";
import { storageRoomsColumns } from "../components/StorageRoomsTable/storageRoomsColumns";
import { petsColumns } from "../components/PetsTable/petsColumns";

const APARTMENTS_PER_PAGE = 6;
const TAB_ITEMS_PER_PAGE = 5;

const paginateRows = <T,>(rows: T[], page: number, perPage: number) => {
    const start = (page - 1) * perPage;
    return rows.slice(start, start + perPage);
};

const ApartmentsPage = () => {
    const [activeTab, setActiveTab] = useState("apartments");
    const [apartmentsPage, setApartmentsPage] = useState(1);
    const [parkingPage, setParkingPage] = useState(1);
    const [vehiclesPage, setVehiclesPage] = useState(1);
    const [storageRoomsPage, setStorageRoomsPage] = useState(1);
    const [petsPage, setPetsPage] = useState(1);

    const occupiedApartments = APARTMENTS.filter((apartment) => apartment.status === "Ocupado").length;
    const assignedParkingLots = PARKING_LOTS.filter((parkingLot) => parkingLot.status === "Asignado").length;

    const apartmentsTotalPages = Math.max(1, Math.ceil(APARTMENTS.length / APARTMENTS_PER_PAGE));
    const apartmentRows = useMemo(
        () => paginateRows<ApartmentRow>(APARTMENTS, apartmentsPage, APARTMENTS_PER_PAGE),
        [apartmentsPage]
    );

    const parkingLots = PARKING_LOTS;
    const vehicles = APARTMENT_VEHICLES;
    const storageRooms = STORAGE_ROOMS;
    const pets = APARTMENT_PETS;

    const parkingTotalPages = Math.max(1, Math.ceil(parkingLots.length / TAB_ITEMS_PER_PAGE));
    const vehiclesTotalPages = Math.max(1, Math.ceil(vehicles.length / TAB_ITEMS_PER_PAGE));
    const storageRoomsTotalPages = Math.max(1, Math.ceil(storageRooms.length / TAB_ITEMS_PER_PAGE));
    const petsTotalPages = Math.max(1, Math.ceil(pets.length / TAB_ITEMS_PER_PAGE));

    const parkingRows = useMemo(
        () => paginateRows<ParkingLotRow>(parkingLots, parkingPage, TAB_ITEMS_PER_PAGE),
        [parkingLots, parkingPage]
    );
    const vehicleRows = useMemo(
        () => paginateRows<ApartmentVehicleRow>(vehicles, vehiclesPage, TAB_ITEMS_PER_PAGE),
        [vehicles, vehiclesPage]
    );
    const storageRoomRows = useMemo(
        () => paginateRows<StorageRoomRow>(storageRooms, storageRoomsPage, TAB_ITEMS_PER_PAGE),
        [storageRooms, storageRoomsPage]
    );
    const petRows = useMemo(
        () => paginateRows<ApartmentPetRow>(pets, petsPage, TAB_ITEMS_PER_PAGE),
        [pets, petsPage]
    );

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <h2 className="text-2xl font-semibold text-brand-title">{TITLE_MODULE.APARTMENTS}</h2>
                    <p className="text-sm text-slate-400">
                        Gestiona apartamentos y sus relacionados desde un solo lugar.
                    </p>
                </div>
                <HeaderButton text={APP_TEXT.ADD} icon="ri-add-line" className="w-full lg:w-auto" />
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                <div className="rounded-xl border border-slate-100 bg-white p-5">
                    <p className="text-xs uppercase tracking-wide text-slate-400">Apartamentos</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">{APARTMENTS.length}</p>
                    <p className="mt-1 text-sm text-slate-500">{occupiedApartments} ocupados actualmente</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-white p-5">
                    <p className="text-xs uppercase tracking-wide text-slate-400">Parqueaderos</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">{PARKING_LOTS.length}</p>
                    <p className="mt-1 text-sm text-slate-500">{assignedParkingLots} asignados a residentes</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-white p-5">
                    <p className="text-xs uppercase tracking-wide text-slate-400">Vehiculos</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">{APARTMENT_VEHICLES.length}</p>
                    <p className="mt-1 text-sm text-slate-500">Inventario consolidado por apartamento</p>
                </div>
                <div className="rounded-xl border border-slate-100 bg-white p-5">
                    <p className="text-xs uppercase tracking-wide text-slate-400">Mascotas</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900">{APARTMENT_PETS.length}</p>
                    <p className="mt-1 text-sm text-slate-500">Registros activos y pendientes</p>
                </div>
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <div className="flex justify-center">
                    <TabsList>
                        <TabsTrigger value="apartments">Apartamentos</TabsTrigger>
                        <TabsTrigger value="parking-lots">Parqueaderos</TabsTrigger>
                        <TabsTrigger value="vehicles">Vehiculos</TabsTrigger>
                        <TabsTrigger value="storage-rooms">Cuartos utiles</TabsTrigger>
                        <TabsTrigger value="pets">Mascotas</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="apartments" className="space-y-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-semibold text-2xl text-brand-title">{TITLE_MODULE.APARTMENTS}</h2>
                        <HeaderButton text={APP_TEXT.ADD} icon="ri-add-line" />
                    </div>

                    <DataTable<ApartmentRow>
                        data={apartmentRows}
                        columns={apartmentsColumns}
                        emptyMessage="Sin apartamentos registrados"
                        total={APARTMENTS.length}
                        page={apartmentsPage}
                        perPage={APARTMENTS_PER_PAGE}
                        totalPages={apartmentsTotalPages}
                        onPageChange={setApartmentsPage}
                        search={{
                            placeholder: "Buscar por apartamento, torre o propietario...",
                            keys: ["name", "tower", "owner"],
                        }}
                        filters={[
                            {
                                key: "status",
                                label: "Estado",
                                options: [
                                    { label: "Ocupado", value: "Ocupado" },
                                    { label: "Disponible", value: "Disponible" },
                                    { label: "Reservado", value: "Reservado" },
                                ],
                            },
                        ]}
                    />
                </TabsContent>

                <TabsContent value="parking-lots" className="space-y-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-semibold text-2xl text-brand-title">Parqueaderos</h2>
                        <HeaderButton text={APP_TEXT.ADD} icon="ri-add-line" />
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-white p-5">
                        <DataTable<ParkingLotRow>
                            data={parkingRows}
                            columns={parkingLotsColumns}
                            emptyMessage="Sin parqueaderos registrados"
                            total={parkingLots.length}
                            page={parkingPage}
                            perPage={TAB_ITEMS_PER_PAGE}
                            totalPages={parkingTotalPages}
                            onPageChange={setParkingPage}
                        />
                    </div>
                </TabsContent>

                <TabsContent value="vehicles" className="space-y-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-semibold text-2xl text-brand-title">Vehiculos</h2>
                        <HeaderButton text={APP_TEXT.ADD} icon="ri-add-line" />
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-white p-5">
                        <DataTable<ApartmentVehicleRow>
                            data={vehicleRows}
                            columns={apartmentVehiclesColumns}
                            emptyMessage="Sin vehiculos registrados"
                            total={vehicles.length}
                            page={vehiclesPage}
                            perPage={TAB_ITEMS_PER_PAGE}
                            totalPages={vehiclesTotalPages}
                            onPageChange={setVehiclesPage}
                        />
                    </div>
                </TabsContent>

                <TabsContent value="storage-rooms" className="space-y-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-semibold text-2xl text-brand-title">Cuartos utiles</h2>
                        <HeaderButton text={APP_TEXT.ADD} icon="ri-add-line" />
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-white p-5">
                        <DataTable<StorageRoomRow>
                            data={storageRoomRows}
                            columns={storageRoomsColumns}
                            emptyMessage="Sin cuartos utiles registrados"
                            total={storageRooms.length}
                            page={storageRoomsPage}
                            perPage={TAB_ITEMS_PER_PAGE}
                            totalPages={storageRoomsTotalPages}
                            onPageChange={setStorageRoomsPage}
                        />
                    </div>
                </TabsContent>

                <TabsContent value="pets" className="space-y-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-semibold text-2xl text-brand-title">Mascotas</h2>
                        <HeaderButton text={APP_TEXT.ADD} icon="ri-add-line" />
                    </div>

                    <div className="rounded-2xl border border-slate-100 bg-white p-5">
                        <DataTable<ApartmentPetRow>
                            data={petRows}
                            columns={petsColumns}
                            emptyMessage="Sin mascotas registradas"
                            total={pets.length}
                            page={petsPage}
                            perPage={TAB_ITEMS_PER_PAGE}
                            totalPages={petsTotalPages}
                            onPageChange={setPetsPage}
                        />
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default ApartmentsPage;
