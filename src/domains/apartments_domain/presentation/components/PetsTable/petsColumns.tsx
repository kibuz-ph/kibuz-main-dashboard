import type { ColumnDef } from "@tanstack/react-table";
import type { ApartmentPetRow } from "@/domains/apartments_domain/application/constants/types";

const STATUS_STYLES: Record<ApartmentPetRow["status"], string> = {
    Registrada: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pendiente: "bg-amber-50 text-amber-700 border-amber-200",
};

export const petsColumns: ColumnDef<ApartmentPetRow>[] = [
    {
        accessorKey: "name",
        header: "Mascota",
        cell: ({ row }) => (
            <div>
                <p className="text-sm font-medium text-slate-800">{row.original.name}</p>
                <p className="text-xs text-slate-400">{row.original.type}</p>
            </div>
        ),
    },
    {
        accessorKey: "breed",
        header: "Raza",
        cell: ({ row }) => <span className="text-sm text-slate-500">{row.original.breed}</span>,
    },
    {
        accessorKey: "caretaker",
        header: "Responsable",
        cell: ({ row }) => <span className="text-sm text-slate-500">{row.original.caretaker}</span>,
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
