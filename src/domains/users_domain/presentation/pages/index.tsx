import { useState } from "react";
import { TITLE_MODULE } from "@/shared/application/constants/appData";
import HeaderButton from "@/shared/presentation/components/HeaderButton";
import { useActivateUser, useDeleteUser, useUsers } from "../../application/hooks/useUsers";
import { DataTable } from "kibuz-component-library-front";
import type { User, UsersPaginatedResponse, UserRow } from "@/domains/users_domain/application/constants/types";
import { useUserRows } from "@/domains/users_domain/application/hooks/useUserRows";
import { userColumns } from "../components/UsersTable/usersColumns";
import UserFormModal from "../components/UserFormModal";
import AppModal from "@/shared/presentation/components/AppModal";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const UsersPage = () => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(10);
    const { data, isLoading, isError } = useUsers({ page, perPage });
    const response = data as UsersPaginatedResponse | User[] | undefined;
    const { rows, total, totalPages } = useUserRows(response);

    const [formModalOpen, setFormModalOpen] = useState(false);
    const [formMode, setFormMode] = useState<"create" | "edit">("create");
    const [editingUserId, setEditingUserId] = useState<string | undefined>(undefined);
    const [userToDelete, setUserToDelete] = useState<UserRow | null>(null);

    const { mutate: activateUser, isPending: isActivating } = useActivateUser();
    const { mutate: deleteUser, isPending: isDeleting } = useDeleteUser();

    const openCreateModal = () => {
        setFormMode("create");
        setEditingUserId(undefined);
        setFormModalOpen(true);
    };

    const openEditModal = (row: UserRow) => {
        setFormMode("edit");
        setEditingUserId(row.id);
        setFormModalOpen(true);
    };

    const handleUserRowAction = (row: UserRow, actionId: string) => {
        if (actionId === "edit") {
            openEditModal(row);
            return;
        }

        if (actionId === "activate") {
            activateUser(row.id);
            return;
        }

        if (actionId === "delete") {
            setUserToDelete(row);
        }
    };

    const confirmDeleteUser = () => {
        if (!userToDelete) return;

        deleteUser(userToDelete.id, {
            onSuccess: () => setUserToDelete(null),
        });
    };

    if (isLoading) return <p>Cargando...</p>;
    if (isError) return <p>Error al cargar</p>;

    console.log('data', data)

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-semibold text-2xl text-brand-title">{TITLE_MODULE.USERS}</h2>
                <HeaderButton text="Agregar" icon="ri-add-line" type="button" onClick={openCreateModal} />
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
                renderRowActions={(row) => (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                            >
                                <span className="text-base leading-none">...</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-44 text-sm">
                            <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => handleUserRowAction(row, "edit")}
                            >
                                Editar usuario
                            </DropdownMenuItem>
                            {!row.isActive ? (
                                <DropdownMenuItem
                                    className="cursor-pointer"
                                    disabled={isActivating}
                                    onClick={() => handleUserRowAction(row, "activate")}
                                >
                                    Activar usuario
                                </DropdownMenuItem>
                            ) : null}
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                className="cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-50"
                                onClick={() => handleUserRowAction(row, "delete")}
                            >
                                Eliminar
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                )}
            />

            {formModalOpen ? (
                <UserFormModal
                    key={`${formMode}-${editingUserId ?? "new"}`}
                    open={formModalOpen}
                    onOpenChange={setFormModalOpen}
                    mode={formMode}
                    userId={editingUserId}
                />
            ) : null}

            <AppModal
                open={!!userToDelete}
                onOpenChange={(open) => {
                    if (!open) setUserToDelete(null);
                }}
                title="Eliminar usuario"
                description={`¿Seguro que deseas eliminar a ${userToDelete?.name ?? "este usuario"}? Esta acción no se puede deshacer.`}
                footer={
                    <>
                        <Button type="button" variant="outline" onClick={() => setUserToDelete(null)} disabled={isDeleting}>
                            Cancelar
                        </Button>
                        <Button
                            type="button"
                            className="bg-red-500 text-white hover:bg-red-600"
                            onClick={confirmDeleteUser}
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Eliminando..." : "Eliminar"}
                        </Button>
                    </>
                }
            >
                <p className="text-sm text-slate-500">
                    El usuario perderá acceso inmediatamente al eliminarse.
                </p>
            </AppModal>
        </div>
    );
};

export default UsersPage;
