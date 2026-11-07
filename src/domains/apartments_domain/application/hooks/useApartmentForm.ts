import { useEffect, useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { getApiErrorMessage } from "@/shared/application/utils/commonCunctions";
import { apartmentSchema, type ApartmentSchema } from "../validators/apartmentSchema";
import {
    APARTMENT_FORM_DEFAULT_VALUES,
    buildApartmentUpdatePayload,
    toApartmentFormValues,
    toApartmentPayload,
} from "../utils/apartmentPayload";
import { useApartment, useCreateApartments, useUpdateApartment } from "./useApartments";

type UseApartmentFormParams = {
    mode: "create" | "edit";
    residentialComplexId: string;
    apartmentId?: string;
    onSuccess: () => void;
};

export const useApartmentForm = ({ mode, residentialComplexId, apartmentId, onSuccess }: UseApartmentFormParams) => {
    const isEdit = mode === "edit";
    const [serverError, setServerError] = useState("");

    const { data: apartment, isLoading: isLoadingApartment } = useApartment({
        residentialComplexId,
        apartmentId: isEdit ? apartmentId : undefined,
    });
    const { mutate: createApartments, isPending: isCreating } = useCreateApartments();
    const { mutate: updateApartment, isPending: isUpdating } = useUpdateApartment();

    const form = useForm<ApartmentSchema>({
        resolver: zodResolver(apartmentSchema),
        defaultValues: APARTMENT_FORM_DEFAULT_VALUES,
    });
    const { reset } = form;

    useEffect(() => {
        if (isEdit && apartment) reset(toApartmentFormValues(apartment));
    }, [isEdit, apartment, reset]);

    const submitCreate = (values: ApartmentSchema) => {
        createApartments(
            { residentialComplexId, body: { items: [toApartmentPayload(values)] } },
            {
                onSuccess,
                onError: (error) => setServerError(getApiErrorMessage(error, "No fue posible crear el apartamento.")),
            }
        );
    };

    const submitUpdate = (values: ApartmentSchema) => {
        if (!apartmentId) return;

        const body = buildApartmentUpdatePayload(values, apartment);
        if (Object.keys(body).length === 0) {
            onSuccess();
            return;
        }

        updateApartment(
            { identifier: { residentialComplexId, apartmentId }, body },
            {
                onSuccess,
                onError: (error) =>
                    setServerError(getApiErrorMessage(error, "No fue posible actualizar el apartamento.")),
            }
        );
    };

    const onSubmit: SubmitHandler<ApartmentSchema> = (values) => {
        setServerError("");
        if (isEdit) submitUpdate(values);
        else submitCreate(values);
    };

    return {
        form,
        isEdit,
        serverError,
        isSaving: isCreating || isUpdating,
        isLoadingApartment: isEdit && isLoadingApartment,
        submit: form.handleSubmit(onSubmit),
    };
};
