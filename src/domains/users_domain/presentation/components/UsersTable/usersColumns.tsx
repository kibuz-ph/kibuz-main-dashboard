import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { UserRow } from "@/domains/users_domain/application/constants/types";

const getInitials = (name: string) => {
    return name
        .split(" ")
        .map((part) => part[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
};

export const userColumns: ColumnDef<UserRow>[] = [
    {
        accessorKey: "name",
        header: "Usuario",
        cell: ({ row }) => (
            <div className="flex items-center gap-3">
                <Avatar className="h-8 w-8 border border-slate-100">
                    <AvatarImage src={row.original.avatar} alt={row.original.name} />
                    <AvatarFallback className="text-xs bg-slate-100 text-slate-600">
                        {getInitials(row.original.name)}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <p className="text-sm font-medium text-slate-800 leading-tight">{row.original.name}</p>
                    <p className="text-xs text-slate-400">{row.original.email}</p>
                </div>
            </div>
        ),
    },
    {
        accessorKey: "document",
        header: "Documento",
        cell: ({ row }) => <span className="text-sm text-slate-500">{row.original.userDetail.document}</span>,
    },
    {
        accessorKey: "phone",
        header: "Telefono",
        cell: ({ row }) => <span className="text-sm text-slate-500">{row.original.userDetail.phone}</span>,
    },
];
