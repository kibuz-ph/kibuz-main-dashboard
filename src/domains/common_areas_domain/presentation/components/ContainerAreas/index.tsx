import { useState, type ChangeEvent } from "react";
import { useCommonAreas, useCreateCommonArea } from "@/domains/common_areas_domain/application/hooks/useCommonAreas";
import type { CreateCommonAreaForm } from "@/domains/common_areas_domain/application/constants/types";
import {
    COMMON_AREA_ICON_OPTIONS,
    resolveCommonAreaIconClass,
} from "@/domains/common_areas_domain/application/constants/iconOptions";
import { selectActiveComplex } from "@/domains/residential_complex_domain/application/redux/selectors/residentialComplexSelector";
import { useAppSelector } from "@/shared/application/store/hooks";
import CardArea from "../CardArea";
import { Button } from "@/components/ui/button";
import { TITLE_MODULE } from "@/shared/application/constants/appData";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import AppModal from "@/shared/presentation/components/AppModal";

const DEFAULT_FORM: CreateCommonAreaForm = {
    name: "",
    icon: "icon-swimming",
    description: "",
};

const getCreateCommonAreaErrorMessage = (error: unknown) => {
    if (!error || typeof error !== "object") {
        return "No fue posible crear la zona comun. Intenta de nuevo.";
    }

    const candidate = error as {
        message?: string;
        error?: string;
        errors?: string[] | Record<string, unknown>;
    };

    if (Array.isArray(candidate.errors) && candidate.errors.length > 0) {
        return candidate.errors.join(", ");
    }

    if (candidate.errors && typeof candidate.errors === "object") {
        const values = Object.values(candidate.errors)
            .flatMap((value) => (Array.isArray(value) ? value : [value]))
            .filter(Boolean)
            .map(String);

        if (values.length > 0) return values.join(", ");
    }

    return candidate.message || candidate.error || "No fue posible crear la zona comun. Intenta de nuevo.";
};

const ContainerAreas = () => {
    const activeComplex = useAppSelector(selectActiveComplex);
    const { data, isLoading, isError } = useCommonAreas(activeComplex?.id);
    const { mutate: createCommonArea, isPending: isCreatingCommonArea } = useCreateCommonArea();
    const commonAreas = data?.items ?? [];
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [form, setForm] = useState<CreateCommonAreaForm>(DEFAULT_FORM);
    const [feedback, setFeedback] = useState("");
    const selectedIcon = COMMON_AREA_ICON_OPTIONS.find((option) => option.value === form.icon);

    const handleInputChange =
        (key: keyof Pick<CreateCommonAreaForm, "name" | "description">) =>
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = event.target.value;
            setForm((prev) => ({
                ...prev,
                [key]: value,
            }));
            setFeedback("");
        };

    const handleCreateCommonArea = () => {
        if (!activeComplex?.id) {
            setFeedback("Selecciona una unidad residencial antes de crear una zona comun.");
            return;
        }

        if (!form.name.trim() || !form.description.trim() || !form.icon.trim()) {
            setFeedback("Completa nombre, icono y descripcion para crear la zona comun.");
            return;
        }

        createCommonArea(
            {
                residentialComplexId: activeComplex.id,
                body: {
                    name: form.name.trim(),
                    icon: form.icon,
                    description: form.description.trim(),
                },
            },
            {
                onSuccess: () => {
                    setForm(DEFAULT_FORM);
                    setFeedback("");
                    setIsModalOpen(false);
                },
                onError: (error) => {
                    setFeedback(getCreateCommonAreaErrorMessage(error));
                },
            }
        );
    };

    return (
        <div className="p-8 border border-gray-200 rounded-xl">
            <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-2">
                    <i className="ri-map-pin-4-line mb-1"></i>
                    <h4 className="font-semibold text-lg">{TITLE_MODULE.COMMON_AREAS}</h4>
                </div>
                <Button
                    type="button"
                    className="rounded-sm bg-brand-primary cursor-pointer"
                    onClick={() => {
                        setFeedback("");
                        setIsModalOpen(true);
                    }}
                    disabled={!activeComplex?.id}
                >
                    <i className="ri-add-line"></i>
                    Agregar zona
                </Button>
            </div>

            {!activeComplex?.id ? (
                <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                    Selecciona una unidad residencial para ver sus zonas comunes.
                </div>
            ) : null}

            {activeComplex?.id && isLoading ? (
                <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                    Cargando zonas comunes...
                </div>
            ) : null}

            {activeComplex?.id && isError ? (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-6 text-sm text-red-600">
                    No fue posible cargar las zonas comunes de esta unidad.
                </div>
            ) : null}

            {activeComplex?.id && !isLoading && !isError && commonAreas.length === 0 ? (
                <div className="rounded-lg border border-dashed border-slate-200 bg-slate-50 px-4 py-6 text-sm text-slate-500">
                    Esta unidad residencial aun no tiene zonas comunes registradas.
                </div>
            ) : null}

            {commonAreas.length > 0 ? (
                <div className="grid grid-cols-3 2xl:grid-cols-5 gap-8">
                    {commonAreas.map((item) => {
                        return <CardArea key={item.id} area={item} />;
                    })}
                </div>
            ) : null}

            <AppModal
                open={isModalOpen}
                onOpenChange={(open) => {
                    setIsModalOpen(open);
                    if (!open) {
                        setFeedback("");
                    }
                }}
                title="Agregar zona comun"
                description="Crea una nueva zona comun para la unidad residencial activa."
                footer={
                    <>
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsModalOpen(false)}
                            disabled={isCreatingCommonArea}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="button"
                            className="bg-brand-primary text-white hover:bg-brand-primary/90"
                            onClick={handleCreateCommonArea}
                            disabled={isCreatingCommonArea}
                        >
                            {isCreatingCommonArea ? "Guardando..." : "Guardar zona"}
                        </Button>
                    </>
                }
            >
                {feedback ? (
                    <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
                        {feedback}
                    </div>
                ) : null}

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="common-area-name">Nombre</Label>
                        <Input
                            id="common-area-name"
                            value={form.name}
                            onChange={handleInputChange("name")}
                            placeholder="Ej. Piscina"
                            className="h-11"
                        />
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="common-area-icon">Icono</Label>
                        <Select
                            value={form.icon}
                            onValueChange={(value) => {
                                setForm((prev) => ({
                                    ...prev,
                                    icon: value,
                                }));
                                setFeedback("");
                            }}
                        >
                            <SelectTrigger id="common-area-icon" className="h-11 w-full">
                                <div className="flex items-center gap-2 text-sm">
                                    <i className={`${resolveCommonAreaIconClass(form.icon)} text-lg text-slate-500`} />
                                    <SelectValue placeholder="Selecciona un icono" />
                                </div>
                            </SelectTrigger>
                            <SelectContent>
                                {COMMON_AREA_ICON_OPTIONS.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        <div className="flex items-center gap-2">
                                            <i className={`${option.iconClass} text-lg text-slate-500`} />
                                            <span>{option.label}</span>
                                        </div>
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        {selectedIcon ? (
                            <p className="flex items-center gap-2 text-xs text-slate-500">
                                <i className={`${selectedIcon.iconClass} text-base`} />
                                Vista previa del icono seleccionado: {selectedIcon.label}
                            </p>
                        ) : null}
                    </div>

                    <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="common-area-description">Descripcion</Label>
                        <Textarea
                            id="common-area-description"
                            value={form.description}
                            onChange={handleInputChange("description")}
                            placeholder="Describe brevemente la zona comun"
                            className="min-h-28"
                        />
                    </div>
                </div>
            </AppModal>
        </div>
    );
};

export default ContainerAreas;
