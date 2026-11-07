import AppModal from "@/shared/presentation/components/AppModal";
import { Button } from "@/components/ui/button";
import { useTowers } from "@/domains/towers_domain/application/hooks/useTowers";
import { useApartmentForm } from "@/domains/apartments_domain/application/hooks/useApartmentForm";
import ApartmentFormFields from "../ApartmentFormFields";

type ApartmentFormModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode: "create" | "edit";
    residentialComplexId: string;
    apartmentId?: string;
};

const ApartmentFormModal = ({ open, onOpenChange, mode, residentialComplexId, apartmentId }: ApartmentFormModalProps) => {
    const { data: towersResponse, isLoading: isLoadingTowers } = useTowers(residentialComplexId);
    const { form, isEdit, serverError, isSaving, isLoadingApartment, submit } = useApartmentForm({
        mode,
        residentialComplexId,
        apartmentId,
        onSuccess: () => onOpenChange(false),
    });

    return (
        <AppModal
            open={open}
            onOpenChange={onOpenChange}
            title={isEdit ? "Editar apartamento" : "Agregar apartamento"}
            description={
                isEdit
                    ? "Actualiza la información del apartamento."
                    : "Completa la información para registrar un nuevo apartamento."
            }
            contentClassName="sm:max-w-lg"
            footer={
                <>
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        form="apartment-form"
                        className="bg-brand-primary text-white hover:bg-brand-primary/90"
                        disabled={isSaving || isLoadingApartment}
                    >
                        {isSaving ? "Guardando..." : isEdit ? "Guardar cambios" : "Crear apartamento"}
                    </Button>
                </>
            }
        >
            {serverError ? (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {serverError}
                </div>
            ) : null}

            {isLoadingApartment ? (
                <p className="text-sm text-slate-400">Cargando datos del apartamento...</p>
            ) : (
                <form id="apartment-form" onSubmit={submit} className="space-y-4">
                    <ApartmentFormFields
                        form={form}
                        towers={towersResponse?.items ?? []}
                        isLoadingTowers={isLoadingTowers}
                    />
                </form>
            )}
        </AppModal>
    );
};

export default ApartmentFormModal;
