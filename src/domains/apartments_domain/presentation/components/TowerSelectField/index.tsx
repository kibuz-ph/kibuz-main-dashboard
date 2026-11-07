import { Controller, type Control } from "react-hook-form";
import { Field, FieldLabel } from "@/components/ui/field";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Tower } from "@/domains/towers_domain/application/constants/types";
import type { ApartmentSchema } from "@/domains/apartments_domain/application/validators/apartmentSchema";

type TowerSelectFieldProps = {
    control: Control<ApartmentSchema>;
    towers: Tower[];
    isLoading: boolean;
    error?: string;
};

const getPlaceholder = (isLoading: boolean, hasTowers: boolean) => {
    if (isLoading) return "Cargando torres...";
    return hasTowers ? "Selecciona una torre" : "No hay torres registradas";
};

const TowerSelectField = ({ control, towers, isLoading, error }: TowerSelectFieldProps) => {
    return (
        <Field data-invalid={!!error}>
            <FieldLabel htmlFor="towerId">Torre</FieldLabel>
            <Controller
                control={control}
                name="towerId"
                render={({ field }) => (
                    <Select value={field.value} onValueChange={field.onChange} disabled={isLoading || towers.length === 0}>
                        <SelectTrigger id="towerId" className="w-full" aria-invalid={!!error}>
                            <SelectValue placeholder={getPlaceholder(isLoading, towers.length > 0)} />
                        </SelectTrigger>
                        <SelectContent>
                            {towers.map((tower) => (
                                <SelectItem key={tower.id} value={tower.id}>
                                    {tower.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            />
            {error && <p className="text-sm text-destructive">{error}</p>}
        </Field>
    );
};

export default TowerSelectField;
