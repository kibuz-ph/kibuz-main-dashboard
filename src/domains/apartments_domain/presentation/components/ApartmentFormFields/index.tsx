import type { UseFormReturn } from "react-hook-form";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { Tower } from "@/domains/towers_domain/application/constants/types";
import type { ApartmentSchema } from "@/domains/apartments_domain/application/validators/apartmentSchema";
import TowerSelectField from "../TowerSelectField";

type ApartmentFormFieldsProps = {
    form: UseFormReturn<ApartmentSchema>;
    towers: Tower[];
    isLoadingTowers: boolean;
};

const ApartmentFormFields = ({ form, towers, isLoadingTowers }: ApartmentFormFieldsProps) => {
    const {
        register,
        control,
        formState: { errors },
    } = form;

    return (
        <FieldGroup className="grid gap-4 sm:grid-cols-2">
            <div className="sm:col-span-2">
                <TowerSelectField
                    control={control}
                    towers={towers}
                    isLoading={isLoadingTowers}
                    error={errors.towerId?.message}
                />
            </div>

            <Field data-invalid={!!errors.reference}>
                <FieldLabel htmlFor="reference">Referencia</FieldLabel>
                <Input id="reference" placeholder="Ej: 1011" aria-invalid={!!errors.reference} {...register("reference")} />
                {errors.reference && <p className="text-sm text-destructive">{errors.reference.message}</p>}
            </Field>

            <Field data-invalid={!!errors.floor}>
                <FieldLabel htmlFor="floor">Piso</FieldLabel>
                <Input
                    id="floor"
                    type="number"
                    min={0}
                    placeholder="Ej: 10"
                    aria-invalid={!!errors.floor}
                    {...register("floor", { valueAsNumber: true })}
                />
                {errors.floor && <p className="text-sm text-destructive">{errors.floor.message}</p>}
            </Field>

            <Field data-invalid={!!errors.size} className="sm:col-span-2">
                <FieldLabel htmlFor="size">Área</FieldLabel>
                <Input id="size" placeholder="Ej: 68 mt2" aria-invalid={!!errors.size} {...register("size")} />
                {errors.size && <p className="text-sm text-destructive">{errors.size.message}</p>}
            </Field>
        </FieldGroup>
    );
};

export default ApartmentFormFields;
