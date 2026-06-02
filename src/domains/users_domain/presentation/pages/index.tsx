import { useState } from "react";
import { TITLE_MODULE } from "@/shared/application/constants/appData";
import HeaderButton from "@/shared/presentation/components/HeaderButton";
import { useUsers } from "../../application/hooks/useUsers";
import { DataTable } from "kibuz-component-library-front";
import type { User, UsersPaginatedResponse, UserRow } from "@/domains/users_domain/application/constants/types";
import { useUserRows } from "@/domains/users_domain/application/hooks/useUserRows";
import { userColumns } from "../components/UsersTable/usersColumns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useVehiclesByApartment } from "@/domains/vehicles_domain/application/hooks/useVehiclesByApartment";
import type { Vehicle, VehicleRow, VehiclesPaginatedResponse } from "@/domains/vehicles_domain/application/constants/types";
import { useVehicleRows } from "@/domains/vehicles_domain/application/hooks/useVehicleRows";
import { vehicleColumns } from "@/domains/vehicles_domain/presentation/components/VehiclesTable/vehiclesColumns";
import { useAppSelector } from "@/shared/application/store/hooks";
import { selectActiveComplex } from "@/domains/residential_complex_domain/application/redux/selectors/residentialComplexSelector";
import { useSearchParams } from "react-router-dom";

const UsersPage = () => {
    const [activeTab, setActiveTab] = useState("users");
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const { data, isLoading, isError } = useUsers({ page, perPage });
    const response = data as UsersPaginatedResponse | User[] | undefined;
    const { rows, total, totalPages } = useUserRows(response);
    const [vehiclesPage, setVehiclesPage] = useState(1);
    const [vehiclesPerPage, setVehiclesPerPage] = useState(10);
    const activeComplex = useAppSelector(selectActiveComplex);
    const [searchParams] = useSearchParams();
    const apartmentId = searchParams.get("apartmentId") ?? "f4f61cb6-d126-4cfd-b6e9-16fffb66e670";
    const complexId = activeComplex?.id ?? "cc899775-f8d1-414c-b9ee-56d84a41fff1";
    const { data: vehiclesData, isLoading: isVehiclesLoading, isError: isVehiclesError } = useVehiclesByApartment({
        id: complexId,
        apartmentId,
    });
    const vehiclesResponse = vehiclesData as VehiclesPaginatedResponse | Vehicle[] | undefined;
    const { rows: vehicleRows, total: vehiclesTotal, totalPages: vehiclesTotalPages } =
        useVehicleRows(vehiclesResponse);

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar</p>;

    console.log('data', data)
    
    return (
        <div>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                <div className="flex justify-center">
                    <TabsList>
                        <TabsTrigger value="users">Usuarios</TabsTrigger>
                        <TabsTrigger value="vehicles">Vehiculos</TabsTrigger>
                        <TabsTrigger value="pets">Mascotas</TabsTrigger>
                    </TabsList>
                </div>

                <TabsContent value="users">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-semibold text-2xl text-brand-title">{TITLE_MODULE.USERS}</h2>
                        <HeaderButton text="Agregar" icon="ri-add-line" />
                    </div>
                    <DataTable<UserRow>
                        data={rows}
                        columns={userColumns}
                        emptyMessage="Sin resultados"
                        total={total}
                        page={page}
                        perPage={perPage}
                        totalPages={totalPages}
                        onPageChange={setPage}
                        onPerPageChange={(nextPerPage) => {
                            setPerPage(nextPerPage);
                            setPage(1);
                        }}
                        perPageOptions={[5, 10, 20, 50]}
                    />
                </TabsContent>

                <TabsContent value="vehicles">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-semibold text-2xl text-brand-title">Vehiculos</h2>
                        <HeaderButton text="Agregar" icon="ri-add-line" />
                    </div>
                    {isVehiclesLoading ? (
                        <p>Cargando...</p>
                    ) : isVehiclesError ? (
                        <p>Error al cargar</p>
                    ) : (
                        <DataTable<VehicleRow>
                            data={vehicleRows}
                            columns={vehicleColumns}
                            emptyMessage="Sin resultados"
                            total={vehiclesTotal}
                            page={vehiclesPage}
                            perPage={vehiclesPerPage}
                            totalPages={vehiclesTotalPages}
                            onPageChange={setVehiclesPage}
                            onPerPageChange={(nextPerPage) => {
                                setVehiclesPerPage(nextPerPage);
                                setVehiclesPage(1);
                            }}
                            perPageOptions={[5, 10, 20, 50]}
                        />
                    )}
                </TabsContent>

                <TabsContent value="pets">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="font-semibold text-2xl text-brand-title">Mascotas</h2>
                        <HeaderButton text="Agregar" icon="ri-add-line" />
                    </div>
                    <div className="rounded-xl border border-slate-100 bg-white p-10 text-center text-sm text-slate-400">
                        Tabla de mascotas pendiente de integrar.
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
};

export default UsersPage;
