import type { ColumnDef } from "@tanstack/react-table";
import type { ApartmentRow } from "@/domains/apartments_domain/application/constants/types";

const STATUS_STYLES: Record<ApartmentRow["status"], string> = {
    Ocupado: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Disponible: "bg-sky-50 text-sky-700 border-sky-200",
    Reservado: "bg-amber-50 text-amber-700 border-amber-200",
};

export const apartmentsColumns: ColumnDef<ApartmentRow>[] = [
    {
        accessorKey: "name",
        header: "Apartamento",
        cell: ({ row }) => (
            <div>
                <p className="text-sm font-medium text-slate-800">{row.original.name}</p>
                <p className="text-xs text-slate-400">{row.original.floor}</p>
            </div>
        ),
    },
    {
        accessorKey: "tower",
        header: "Torre",
        cell: ({ row }) => <span className="text-sm text-slate-500">{row.original.tower}</span>,
    },
    {
        accessorKey: "owner",
        header: "Propietario",
        cell: ({ row }) => <span className="text-sm text-slate-500">{row.original.owner}</span>,
    },
    {
        accessorKey: "residents",
        header: "Residentes",
        cell: ({ row }) => <span className="text-sm text-slate-500">{row.original.residents}</span>,
    },
    {
        id: "assets",
        header: "Relacionados",
        cell: ({ row }) => (
            <span className="text-sm text-slate-500">
                {row.original.parkingLots} pq / {row.original.vehicles} veh / {row.original.storageRooms} cu / {row.original.pets} mas
            </span>
        ),
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
