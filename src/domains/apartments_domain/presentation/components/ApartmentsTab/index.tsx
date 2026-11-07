import { useState } from "react";
import { DataTable } from "kibuz-component-library-front";
import { APP_TEXT, TITLE_MODULE } from "@/shared/application/constants/appData";
import HeaderButton from "@/shared/presentation/components/HeaderButton";
import type { ApartmentRow } from "@/domains/apartments_domain/application/constants/types";
import { useApartments } from "@/domains/apartments_domain/application/hooks/useApartments";
import { useApartmentRows } from "@/domains/apartments_domain/application/hooks/useApartmentRows";
import { apartmentsColumns } from "../ApartmentsTable/apartmentsColumns";
import ApartmentRowActions from "../ApartmentRowActions";
import ApartmentFormModal from "../ApartmentFormModal";
import DeleteApartmentModal from "../DeleteApartmentModal";

type ApartmentsTabProps = {
    residentialComplexId: string;
};

type FormModalState = { mode: "create" } | { mode: "edit"; apartmentId: string } | null;

const DEFAULT_PER_PAGE = 10;

const ApartmentsTab = ({ residentialComplexId }: ApartmentsTabProps) => {
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(DEFAULT_PER_PAGE);
    const [formModal, setFormModal] = useState<FormModalState>(null);
    const [apartmentToDelete, setApartmentToDelete] = useState<ApartmentRow | null>(null);

    const { data, isLoading, isError } = useApartments({ residentialComplexId, page, perPage });
    const { rows, total, totalPages } = useApartmentRows(data);

    const handlePerPageChange = (nextPerPage: number) => {
        setPerPage(nextPerPage);
        setPage(1);
    };

    const renderTable = () => {
        if (isLoading) return <p className="text-sm text-slate-400">Cargando apartamentos...</p>;
        if (isError) return <p className="text-sm text-red-500">Error al cargar los apartamentos</p>;

        return (
            <DataTable<ApartmentRow>
                data={rows}
                columns={apartmentsColumns}
                emptyMessage="Sin apartamentos registrados"
                total={total}
                page={page}
                perPage={perPage}
                totalPages={totalPages}
                onPageChange={setPage}
                onPerPageChange={handlePerPageChange}
                perPageOptions={[5, 10, 20, 50]}
                renderRowActions={(row) => (
                    <ApartmentRowActions
                        onEdit={() => setFormModal({ mode: "edit", apartmentId: row.id })}
                        onDelete={() => setApartmentToDelete(row)}
                    />
                )}
            />
        );
    };

    return (
        <>
            <div className="flex justify-between items-center mb-6">
                <h2 className="font-semibold text-2xl text-brand-title">{TITLE_MODULE.APARTMENTS}</h2>
                <HeaderButton
                    text={APP_TEXT.ADD}
                    icon="ri-add-line"
                    type="button"
                    onClick={() => setFormModal({ mode: "create" })}
                />
            </div>

            {renderTable()}

            {formModal ? (
                <ApartmentFormModal
                    key={formModal.mode === "edit" ? formModal.apartmentId : "new"}
                    open
                    onOpenChange={(open) => {
                        if (!open) setFormModal(null);
                    }}
                    mode={formModal.mode}
                    apartmentId={formModal.mode === "edit" ? formModal.apartmentId : undefined}
                    residentialComplexId={residentialComplexId}
                />
            ) : null}

            <DeleteApartmentModal
                apartment={apartmentToDelete}
                residentialComplexId={residentialComplexId}
                onClose={() => setApartmentToDelete(null)}
            />
        </>
    );
};

export default ApartmentsTab;
