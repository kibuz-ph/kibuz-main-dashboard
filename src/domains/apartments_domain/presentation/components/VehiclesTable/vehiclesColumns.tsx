import type { ColumnDef } from "@tanstack/react-table";
import type { ApartmentVehicleRow } from "@/domains/apartments_domain/application/constants/types";

const STATUS_STYLES: Record<ApartmentVehicleRow["status"], string> = {
    Activo: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Visitante: "bg-blue-50 text-blue-700 border-blue-200",
};

export const apartmentVehiclesColumns: ColumnDef<ApartmentVehicleRow>[] = [
    {
        accessorKey: "plate",
        header: "Placa",
        cell: ({ row }) => <span className="text-sm font-medium text-slate-700">{row.original.plate}</span>,
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
        accessorKey: "color",
        header: "Color",
        cell: ({ row }) => <span className="text-sm text-slate-500">{row.original.color}</span>,
    },
    {
        accessorKey: "status",
        header: "Estado",
        cell: ({ row }) => (
            <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${STATUS_STYLES[row.original.status]}`}
            >
                {row.original.status}
            </span>
        ),
    },
];
