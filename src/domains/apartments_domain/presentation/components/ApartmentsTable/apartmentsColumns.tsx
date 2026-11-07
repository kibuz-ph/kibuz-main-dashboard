import type { ColumnDef } from "@tanstack/react-table";
import type { ApartmentRow } from "@/domains/apartments_domain/application/constants/types";

export const apartmentsColumns: ColumnDef<ApartmentRow>[] = [
    {
        accessorKey: "reference",
        header: "Apartamento",
        cell: ({ row }) => (
            <div>
                <p className="text-sm font-medium text-slate-800">{row.original.reference}</p>
                <p className="text-xs text-slate-400">Piso {row.original.floor}</p>
            </div>
        ),
    },
    {
        accessorKey: "tower",
        header: "Torre",
        cell: ({ row }) => <span className="text-sm text-slate-500">{row.original.tower}</span>,
    },
    {
        accessorKey: "floor",
        header: "Piso",
        cell: ({ row }) => <span className="text-sm text-slate-500">{row.original.floor}</span>,
    },
    {
        accessorKey: "size",
        header: "Área",
        cell: ({ row }) => <span className="text-sm text-slate-500">{row.original.size}</span>,
    },
];
