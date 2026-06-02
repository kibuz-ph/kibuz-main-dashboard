import type { ColumnDef } from "@tanstack/react-table";
import type { VehicleRow } from "@/domains/vehicles_domain/application/constants/types";

export const vehicleColumns: ColumnDef<VehicleRow>[] = [
    {
        accessorKey: "plate",
        header: "Placa",
        cell: ({ row }) => <span className="text-sm text-slate-700">{row.original.plate}</span>,
    },
    {
        accessorKey: "type",
        header: "Tipo",
        cell: ({ row }) => <span className="text-sm text-slate-500">{row.original.type}</span>,
    },
    {
        accessorKey: "brand",
        header: "Marca",
        cell: ({ row }) => <span className="text-sm text-slate-500">{row.original.brand}</span>,
    },
    {
        accessorKey: "model",
        header: "Modelo",
        cell: ({ row }) => <span className="text-sm text-slate-500">{row.original.model}</span>,
    },
    {
        accessorKey: "color",
        header: "Color",
        cell: ({ row }) => <span className="text-sm text-slate-500">{row.original.color}</span>,
    },
    {
        accessorKey: "apartmentId",
        header: "Apartamento",
        cell: ({ row }) => <span className="text-sm text-slate-500">{row.original.apartmentId}</span>,
    },
];
