import type { ColumnDef } from "@tanstack/react-table";
import type { ParkingLotRow } from "@/domains/apartments_domain/application/constants/types";

const STATUS_STYLES: Record<ParkingLotRow["status"], string> = {
    Asignado: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Disponible: "bg-slate-100 text-slate-600 border-slate-200",
};

export const parkingLotsColumns: ColumnDef<ParkingLotRow>[] = [
    {
        accessorKey: "code",
        header: "Codigo",
        cell: ({ row }) => <span className="text-sm font-medium text-slate-700">{row.original.code}</span>,
    },
    {
        accessorKey: "type",
        header: "Tipo",
        cell: ({ row }) => <span className="text-sm text-slate-500">{row.original.type}</span>,
    },
    {
        accessorKey: "assignedTo",
        header: "Asignado a",
        cell: ({ row }) => <span className="text-sm text-slate-500">{row.original.assignedTo}</span>,
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
