import { useEffect, useState } from "react";
import { Controller, useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import AppModal from "@/shared/presentation/components/AppModal";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import {
    createUserSchema,
    editUserSchema,
    type EditUserSchema,
} from "@/domains/users_domain/application/validators/userSchema";
import { useCreateUser, useUpdateUser, useUser } from "@/domains/users_domain/application/hooks/useUsers";
import type { CreateUserPayload, UpdateUserPayload, User } from "@/domains/users_domain/application/constants/types";

type UserFormModalProps = {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    mode: "create" | "edit";
    userId?: string;
};

const DEFAULT_VALUES: EditUserSchema = {
    document: "",
    firstName: "",
    secondName: "",
    lastName: "",
    secondLastName: "",
    username: "",
    birthday: "",
    email: "",
    phone: "",
    password: "",
    isActive: true,
};

const getApiErrorMessage = (error: unknown, fallback: string) => {
    if (error && typeof error === "object" && "message" in error) {
        const message = (error as { message?: unknown }).message;
        if (typeof message === "string" && message.length > 0) return message;
    }
    return fallback;
};

const optionalText = (value?: string) => {
    const trimmed = value?.trim();
    return trimmed ? trimmed : undefined;
};

// Solo se envian los campos que cambiaron respecto al usuario original: el backend
// valida email/documento/usuario como duplicados sin excluir al propio registro,
// asi que reenviar un valor sin cambios dispara un falso "already exists".
const buildUpdatePayload = (values: EditUserSchema, original?: User): UpdateUserPayload => {
    const candidates: Record<string, string | undefined> = {
        document: values.document.trim(),
        firstName: values.firstName.trim(),
        secondName: optionalText(values.secondName),
        lastName: values.lastName.trim(),
        secondLastName: optionalText(values.secondLastName),
        username: values.username.trim(),
        birthday: values.birthday,
        email: values.email.trim(),
        phone: values.phone.trim(),
    };

    if (!original) {
        return { ...candidates, isActive: values.isActive } as UpdateUserPayload;
    }

    const originalValues: Record<string, string> = {
        document: original.userDetail.document ?? "",
        firstName: original.userDetail.firstName ?? "",
        secondName: original.userDetail.secondName ?? "",
        lastName: original.userDetail.lastName ?? "",
        secondLastName: original.userDetail.secondLastName ?? "",
        username: original.username ?? "",
        birthday: original.userDetail.birthday ? original.userDetail.birthday.slice(0, 10) : "",
        email: original.email ?? "",
        phone: original.userDetail.phone ?? "",
    };

    const payload: UpdateUserPayload = {};

    Object.entries(candidates).forEach(([key, value]) => {
        if ((value ?? "") !== (originalValues[key] ?? "")) {
            (payload as Record<string, string | undefined>)[key] = value;
        }
    });

    if (values.isActive !== original.isActive) {
        payload.isActive = values.isActive;
    }

    return payload;
};

const UserFormModal = ({ open, onOpenChange, mode, userId }: UserFormModalProps) => {
    const isEdit = mode === "edit";
    const [serverError, setServerError] = useState("");

    const { data: user, isLoading: isLoadingUser } = useUser(isEdit ? userId : undefined);
    const { mutate: createUser, isPending: isCreating } = useCreateUser();
    const { mutate: updateUser, isPending: isUpdating } = useUpdateUser();

    const {
        register,
        handleSubmit,
        reset,
        control,
        formState: { errors },
    } = useForm<EditUserSchema>({
        resolver: zodResolver(isEdit ? editUserSchema : createUserSchema),
        defaultValues: DEFAULT_VALUES,
    });

    useEffect(() => {
        if (!isEdit || !user) return;
        reset({
            document: user.userDetail.document ?? "",
            firstName: user.userDetail.firstName ?? "",
            secondName: user.userDetail.secondName ?? "",
            lastName: user.userDetail.lastName ?? "",
            secondLastName: user.userDetail.secondLastName ?? "",
            username: user.username ?? "",
            birthday: user.userDetail.birthday ? user.userDetail.birthday.slice(0, 10) : "",
            email: user.email ?? "",
            phone: user.userDetail.phone ?? "",
            password: "",
            isActive: user.isActive,
        });
    }, [isEdit, user, reset]);

    const isSaving = isCreating || isUpdating;
    const showLoadingState = isEdit && isLoadingUser;

    const onSubmit: SubmitHandler<EditUserSchema> = (values) => {
        setServerError("");

        if (!isEdit) {
            const payload: CreateUserPayload = {
                document: values.document.trim(),
                firstName: values.firstName.trim(),
                secondName: optionalText(values.secondName),
                lastName: values.lastName.trim(),
                secondLastName: optionalText(values.secondLastName),
                username: values.username.trim(),
                birthday: values.birthday,
                email: values.email.trim(),
                phone: values.phone.trim(),
                password: (values.password ?? "").trim(),
            };

            createUser(payload, {
                onSuccess: () => onOpenChange(false),
                onError: (error) => setServerError(getApiErrorMessage(error, "No fue posible crear el usuario.")),
            });
            return;
        }

        if (!userId) return;

        const payload = buildUpdatePayload(values, user);

        const trimmedPassword = values.password?.trim();
        if (trimmedPassword) {
            payload.password = trimmedPassword;
        }

        if (Object.keys(payload).length === 0) {
            onOpenChange(false);
            return;
        }

        updateUser(
            { id: userId, body: payload },
            {
                onSuccess: () => onOpenChange(false),
                onError: (error) => setServerError(getApiErrorMessage(error, "No fue posible actualizar el usuario.")),
            }
        );
    };

    return (
        <AppModal
            open={open}
            onOpenChange={onOpenChange}
            title={isEdit ? "Editar usuario" : "Agregar usuario"}
            description={
                isEdit
                    ? "Actualiza la información del usuario. Deja la contraseña en blanco para no cambiarla."
                    : "Completa la información para crear un nuevo usuario."
            }
            contentClassName="sm:max-w-xl"
            footer={
                <>
                    <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isSaving}>
                        Cancelar
                    </Button>
                    <Button
                        type="submit"
                        form="user-form"
                        className="bg-brand-primary text-white hover:bg-brand-primary/90"
                        disabled={isSaving || showLoadingState}
                    >
                        {isSaving ? "Guardando..." : isEdit ? "Guardar cambios" : "Crear usuario"}
                    </Button>
                </>
            }
        >
            {serverError ? (
                <div className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                    {serverError}
                </div>
            ) : null}

            {showLoadingState ? (
                <p className="text-sm text-slate-400">Cargando datos del usuario...</p>
            ) : (
                <form id="user-form" onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <FieldGroup className="grid gap-4 sm:grid-cols-2">
                        <Field data-invalid={!!errors.document}>
                            <FieldLabel htmlFor="document">Documento</FieldLabel>
                            <Input id="document" aria-invalid={!!errors.document} {...register("document")} />
                            {errors.document && <p className="text-sm text-destructive">{errors.document.message}</p>}
                        </Field>

                        <Field data-invalid={!!errors.username}>
                            <FieldLabel htmlFor="username">Usuario</FieldLabel>
                            <Input id="username" aria-invalid={!!errors.username} {...register("username")} />
                            {errors.username && <p className="text-sm text-destructive">{errors.username.message}</p>}
                        </Field>

                        <Field data-invalid={!!errors.firstName}>
                            <FieldLabel htmlFor="firstName">Primer nombre</FieldLabel>
                            <Input id="firstName" aria-invalid={!!errors.firstName} {...register("firstName")} />
                            {errors.firstName && <p className="text-sm text-destructive">{errors.firstName.message}</p>}
                        </Field>

                        <Field data-invalid={!!errors.secondName}>
                            <FieldLabel htmlFor="secondName">Segundo nombre</FieldLabel>
                            <Input id="secondName" aria-invalid={!!errors.secondName} {...register("secondName")} />
                            {errors.secondName && <p className="text-sm text-destructive">{errors.secondName.message}</p>}
                        </Field>

                        <Field data-invalid={!!errors.lastName}>
                            <FieldLabel htmlFor="lastName">Primer apellido</FieldLabel>
                            <Input id="lastName" aria-invalid={!!errors.lastName} {...register("lastName")} />
                            {errors.lastName && <p className="text-sm text-destructive">{errors.lastName.message}</p>}
                        </Field>

                        <Field data-invalid={!!errors.secondLastName}>
                            <FieldLabel htmlFor="secondLastName">Segundo apellido</FieldLabel>
                            <Input id="secondLastName" aria-invalid={!!errors.secondLastName} {...register("secondLastName")} />
                            {errors.secondLastName && (
                                <p className="text-sm text-destructive">{errors.secondLastName.message}</p>
                            )}
                        </Field>

                        <Field data-invalid={!!errors.email}>
                            <FieldLabel htmlFor="email">Correo</FieldLabel>
                            <Input id="email" type="email" aria-invalid={!!errors.email} {...register("email")} />
                            {errors.email && <p className="text-sm text-destructive">{errors.email.message}</p>}
                        </Field>

                        <Field data-invalid={!!errors.phone}>
                            <FieldLabel htmlFor="phone">Teléfono</FieldLabel>
                            <Input id="phone" aria-invalid={!!errors.phone} {...register("phone")} />
                            {errors.phone && <p className="text-sm text-destructive">{errors.phone.message}</p>}
                        </Field>

                        <Field data-invalid={!!errors.birthday}>
                            <FieldLabel htmlFor="birthday">Fecha de nacimiento</FieldLabel>
                            <Input id="birthday" type="date" aria-invalid={!!errors.birthday} {...register("birthday")} />
                            {errors.birthday && <p className="text-sm text-destructive">{errors.birthday.message}</p>}
                        </Field>

                        <Field data-invalid={!!errors.password}>
                            <FieldLabel htmlFor="password">
                                {isEdit ? "Nueva contraseña (opcional)" : "Contraseña"}
                            </FieldLabel>
                            <Input id="password" type="password" aria-invalid={!!errors.password} {...register("password")} />
                            {errors.password && <p className="text-sm text-destructive">{errors.password.message}</p>}
                        </Field>

                        {isEdit ? (
                            <Field
                                orientation="horizontal"
                                className="sm:col-span-2 justify-between rounded-lg border border-input px-3 py-2.5"
                            >
                                <div>
                                    <FieldLabel htmlFor="isActive">Usuario activo</FieldLabel>
                                    <p className="text-xs text-slate-400">
                                        Desactívalo para bloquear el acceso del usuario sin eliminarlo.
                                    </p>
                                </div>
                                <Controller
                                    control={control}
                                    name="isActive"
                                    render={({ field }) => (
                                        <Switch
                                            id="isActive"
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    )}
                                />
                            </Field>
                        ) : null}
                    </FieldGroup>
                </form>
            )}
        </AppModal>
    );
};

export default UserFormModal;
