import { useQuery } from "@tanstack/react-query";
import { getVehiclesByApartment, type GetVehiclesByApartmentParams } from "@/domains/vehicles_domain/infrastructure/api/vehiclesApi";
import { vehicleKeys } from "../queries/vehicleKeys";

export const useVehiclesByApartment = ({ id, apartmentId }: GetVehiclesByApartmentParams) => {
    const enabled = Boolean(id && apartmentId);

    return useQuery({
        queryKey: [...vehicleKeys.lists(), id, apartmentId],
        queryFn: () => getVehiclesByApartment({ id, apartmentId }),
        staleTime: 1000 * 60 * 5,
        refetchOnWindowFocus: false,
        retry: 2,
        enabled,
    });
};
