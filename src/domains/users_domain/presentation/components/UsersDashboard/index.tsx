import { useEffect, useMemo, useState } from "react";
import UsersTopbar from "./UsersTopbar";
import { USERS } from "./data";
import type { UserRole, UserStatus } from "./types";
import { useUsers } from "@/domains/users_domain/application/hooks/useUsers";
import type { UsersPaginatedResponse } from "@/domains/users_domain/application/constants/types";
import type { ColumnDef } from "@tanstack/react-table";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DataTable from "@/shared/presentation/components/DataTable";
import { ROLE_STYLES, STATUS_DOT, STATUS_STYLES } from "./data";

const UsersDashboard = () => {
    const [selected, setSelected] = useState<number[]>([]);
    const [page, setPage] = useState(1);
    const [perPage] = useState(10);

    const { data } = useUsers({ page, perPage });
    const response = data as UsersPaginatedResponse | undefined;

    const apiPage = response?.page ?? response?.meta?.page;
    const apiPerPage = response?.perPage ?? response?.meta?.perPage;
    const apiTotal = response?.total ?? response?.meta?.total;
    const apiTotalPages = response?.totalPages ?? response?.meta?.totalPages;

    const resolvedPage = apiPage ?? page;
    const resolvedPerPage = apiPerPage ?? perPage;
    const resolvedTotal = apiTotal ?? response?.data?.length ?? USERS.length;
    const resolvedTotalPages = apiTotalPages ?? Math.max(1, Math.ceil(resolvedTotal / resolvedPerPage));

    const toUserRow = (raw: unknown, index: number) => {
        const user = raw as Record<string, unknown>;
        const detail = (user.userDetail ?? user.user_detail ?? {}) as Record<string, unknown>;
        const firstName = (detail.firstName ?? detail.first_name ?? "") as string;
        const secondName = (detail.secondName ?? detail.second_name ?? "") as string;
        const lastName = (detail.lastName ?? detail.first_lastname ?? detail.last_name ?? "") as string;
        const secondLastName = (detail.secondLastName ?? detail.second_lastname ?? "") as string;
        const fullName = [firstName, secondName, lastName, secondLastName].filter(Boolean).join(" ");
        const name = fullName || (user.username as string) || `Usuario ${index + 1}`;
        const email = (user.email as string) || `usuario${index + 1}@kibuz.co`;
        const document = (detail.document as string) || "N/A";
        const phone = (detail.phone as string) || "N/A";
        const roleValue = (user.role as string) || (user.role_name as string) || "Residente";
        const role: UserRole =
            roleValue === "Propietario" || roleValue === "Inquilino" || roleValue === "Residente"
                ? roleValue
                : "Residente";
        const isActive = (user.isActive ?? user.is_active ?? true) as boolean;
        const status: UserStatus = isActive ? "Activo" : "Inactivo";
        const tower = (user.tower as string) || "Torre 1";
        const apartment = (user.apartment as string) || "Apto 101";

        return {
            id: index + 1,
            name,
            email,
            role,
            status,
            joined: "",
            avatar: `https://i.pravatar.cc/40?img=${(index % 70) + 1}`,
            document: document.toString(),
            phone: phone.toString(),
            tower: tower.toString(),
            apartment: apartment.toString(),
        };
    };

    const mappedUsers = useMemo(() => {
        return (response?.data ?? USERS).map((item, idx) => toUserRow(item, idx));
    }, [response?.data]);

    const paginated = useMemo(() => {
        if (response?.data) {
            return mappedUsers;
        }
        const start = (page - 1) * perPage;
        return mappedUsers.slice(start, start + perPage);
    }, [mappedUsers, page, perPage, response?.data]);

    const toggleSelect = (id: number) => {
        setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
    };

    const toggleAll = () => {
        if (selected.length === paginated.length) {
            setSelected([]);
            return;
        }
        setSelected(paginated.map((user) => user.id));
    };

    useEffect(() => {
        setSelected([]);
    }, [page]);

    const handlePageChange = (nextPage: number) => {
        const bounded = Math.min(Math.max(1, nextPage), resolvedTotalPages);
        setPage(bounded);
    };

    const getInitials = (name: string) => {
        return name
            .split(" ")
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase();
    };

    const columns = useMemo<ColumnDef<(typeof paginated)[number]>[]>(
        () => [
            {
                id: "select",
                header: () => (
                    <input
                        type="checkbox"
                        className="rounded border-slate-300 accent-slate-900 cursor-pointer"
                        checked={paginated.length > 0 && selected.length === paginated.length}
                        onChange={toggleAll}
                    />
                ),
                cell: ({ row }) => (
                    <input
                        type="checkbox"
                        className="rounded border-slate-300 accent-slate-900 cursor-pointer"
                        checked={selected.includes(row.original.id)}
                        onChange={() => toggleSelect(row.original.id)}
                    />
                ),
                enableSorting: false,
                size: 40,
            },
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
                cell: ({ row }) => <span className="text-sm text-slate-500">{row.original.document}</span>,
            },
            {
                accessorKey: "phone",
                header: "Telefono",
                cell: ({ row }) => <span className="text-sm text-slate-500">{row.original.phone}</span>,
            },
            {
                id: "unit",
                header: "Unidad",
                accessorFn: (row) => `${row.tower} ${row.apartment}`,
                cell: ({ row }) => (
                    <span className="text-sm text-slate-500">{`${row.original.tower} - ${row.original.apartment}`}</span>
                ),
            },
            {
                accessorKey: "role",
                header: "Rol",
                cell: ({ row }) => (
                    <span
                        className={`inline-flex items-center text-xs font-medium px-2 py-0.5 rounded-full border ${
                            ROLE_STYLES[row.original.role]
                        }`}
                    >
                        {row.original.role}
                    </span>
                ),
            },
            {
                accessorKey: "status",
                header: "Estado",
                cell: ({ row }) => (
                    <span
                        className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-0.5 rounded-full border ${
                            STATUS_STYLES[row.original.status]
                        }`}
                    >
                        <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[row.original.status]}`} />
                        {row.original.status}
                    </span>
                ),
            },
            {
                id: "actions",
                header: "",
                enableSorting: false,
                cell: () => (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                            >
                                <span className="text-base leading-none">...</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44 text-sm">
                            <DropdownMenuLabel className="text-xs text-slate-400">Acciones</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer">Ver perfil</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">Editar usuario</DropdownMenuItem>
                            <DropdownMenuItem className="cursor-pointer">Cambiar rol</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-50">
                                Eliminar
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                ),
            },
        ],
        [paginated, selected]
    );

    return (
        <div className="min-h-screen bg-[#f8f8f6]">
            <UsersTopbar />

            <main className="max-w-7xl mx-auto px-4 sm:px-8 pt-4 pb-8 space-y-6">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Usuarios</h1>
                    <p className="text-sm text-slate-400 mt-0.5">Gestiona el acceso y los roles de tu equipo</p>
                </div>

                <div className="hidden md:block">
                    <DataTable
                        data={paginated}
                        columns={columns}
                        total={resolvedTotal}
                        page={resolvedPage}
                        perPage={resolvedPerPage}
                        totalPages={resolvedTotalPages}
                        onPageChange={handlePageChange}
                        emptyMessage="Sin resultados para tu busqueda"
                        search={{
                            placeholder: "Buscar por nombre, email, documento o torre...",
                            keys: ["name", "email", "document", "phone", "tower", "apartment"],
                        }}
                        filters={[
                            {
                                key: "role",
                                label: "Rol",
                                options: [
                                    { label: "Propietario", value: "Propietario" },
                                    { label: "Inquilino", value: "Inquilino" },
                                    { label: "Residente", value: "Residente" },
                                ],
                            },
                            {
                                key: "status",
                                label: "Estado",
                                options: [
                                    { label: "Activo", value: "Activo" },
                                    { label: "Inactivo", value: "Inactivo" },
                                    { label: "Pendiente", value: "Pendiente" },
                                ],
                            },
                        ]}
                    />
                </div>
            </main>
        </div>
    );
};

export default UsersDashboard;
