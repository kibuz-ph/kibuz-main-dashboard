import AppModal from "@/shared/presentation/components/AppModal";
import { Button } from "@/components/ui/button";
import type { ApartmentRow } from "@/domains/apartments_domain/application/constants/types";
import { useDeleteApartment } from "@/domains/apartments_domain/application/hooks/useApartments";

type DeleteApartmentModalProps = {
    apartment: ApartmentRow | null;
    residentialComplexId: string;
    onClose: () => void;
};

const DeleteApartmentModal = ({ apartment, residentialComplexId, onClose }: DeleteApartmentModalProps) => {
    const { mutate: deleteApartment, isPending: isDeleting } = useDeleteApartment();

    const confirmDelete = () => {
        if (!apartment) return;

        deleteApartment({ residentialComplexId, apartmentId: apartment.id }, { onSuccess: onClose });
    };

    return (
        <AppModal
            open={!!apartment}
            onOpenChange={(open) => {
                if (!open) onClose();
            }}
            title="Eliminar apartamento"
            description={`¿Seguro que deseas eliminar el apartamento ${apartment?.reference ?? ""} (${apartment?.tower ?? ""})? Esta acción no se puede deshacer.`}
            footer={
                <>
                    <Button type="button" variant="outline" onClick={onClose} disabled={isDeleting}>
                        Cancelar
                    </Button>
                    <Button
                        type="button"
                        className="bg-red-500 text-white hover:bg-red-600"
                        onClick={confirmDelete}
                        disabled={isDeleting}
                    >
                        {isDeleting ? "Eliminando..." : "Eliminar"}
                    </Button>
                </>
            }
        >
            <p className="text-sm text-slate-500">
                El apartamento dejará de estar disponible en el conjunto residencial.
            </p>
        </AppModal>
    );
};

export default DeleteApartmentModal;
