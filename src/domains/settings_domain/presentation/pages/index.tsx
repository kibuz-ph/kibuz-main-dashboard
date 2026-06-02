import { useEffect, useMemo, useRef, useState, type ChangeEvent } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/domains/auth_domain/application/hooks/useAuth";
import type {
    ResidentialComplex,
    UpdateResidentialComplexBody,
    UpdateResidentialComplexResponse,
} from "@/domains/residential_complex_domain/application/constants/types";
import { useUpdateResidentialComplex } from "@/domains/residential_complex_domain/application/hooks/useResidentialComplexes";
import { selectActiveComplex } from "@/domains/residential_complex_domain/application/redux/selectors/residentialComplexSelector";
import { setActiveComplex, setComplexes } from "@/domains/residential_complex_domain/application/redux/slices/residentialComplexSlice";
import { getMyResidentialComplexes } from "@/domains/residential_complex_domain/infrastructure/api/residentialComplexApi";
import { TITLE_MODULE } from "@/shared/application/constants/appData";
import { SETTINGS_EVENTS, SETTINGS_STORAGE_KEYS } from "@/shared/application/constants/settings";
import { useAppDispatch, useAppSelector } from "@/shared/application/store/hooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

type UserProfileSettings = {
    firstName: string;
    lastName: string;
    username: string;
    userPhoto: string;
};

type LocalAccountSettings = {
    accentColor: string;
    surfaceColor: string;
    logo: string;
    welcomeText: string;
};

type AccountForm = {
    nit: string;
    complexName: string;
    complexSlug: string;
    phone: string;
    city: string;
    state: string;
    country: string;
    address: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    surfaceColor: string;
    logo: string;
    welcomeText: string;
};

type LocalAccountSettingsMap = Record<string, LocalAccountSettings>;

const DEFAULT_PROFILE_FORM: UserProfileSettings = {
    firstName: "",
    lastName: "",
    username: "",
    userPhoto: "",
};

const DEFAULT_LOCAL_ACCOUNT_SETTINGS: LocalAccountSettings = {
    accentColor: "#acced3",
    surfaceColor: "#f8f8f8",
    logo: "",
    welcomeText: "Administra la experiencia visual y los datos clave de tu unidad residencial.",
};

const DEFAULT_ACCOUNT_FORM: AccountForm = {
    nit: "",
    complexName: "",
    complexSlug: "",
    phone: "",
    city: "",
    state: "",
    country: "",
    address: "",
    primaryColor: "#152c46",
    secondaryColor: "#06647b",
    accentColor: DEFAULT_LOCAL_ACCOUNT_SETTINGS.accentColor,
    surfaceColor: DEFAULT_LOCAL_ACCOUNT_SETTINGS.surfaceColor,
    logo: DEFAULT_LOCAL_ACCOUNT_SETTINGS.logo,
    welcomeText: DEFAULT_LOCAL_ACCOUNT_SETTINGS.welcomeText,
};

const readUserProfile = (): UserProfileSettings => {
    if (typeof window === "undefined") return DEFAULT_PROFILE_FORM;

    try {
        const raw = localStorage.getItem(SETTINGS_STORAGE_KEYS.USER_PROFILE);
        return raw ? (JSON.parse(raw) as UserProfileSettings) : DEFAULT_PROFILE_FORM;
    } catch {
        return DEFAULT_PROFILE_FORM;
    }
};

const readLocalAccountSettingsMap = (): LocalAccountSettingsMap => {
    if (typeof window === "undefined") return {};

    try {
        const raw = localStorage.getItem(SETTINGS_STORAGE_KEYS.COMPLEX_BRANDING);
        return raw ? (JSON.parse(raw) as LocalAccountSettingsMap) : {};
    } catch {
        return {};
    }
};

const saveLocalAccountSettingsMap = (value: LocalAccountSettingsMap) => {
    if (typeof window === "undefined") return;
    localStorage.setItem(SETTINGS_STORAGE_KEYS.COMPLEX_BRANDING, JSON.stringify(value));
};

const sanitizeHex = (value: string, fallback: string) => {
    const next = value.startsWith("#") ? value : `#${value}`;
    return /^#[0-9a-fA-F]{6}$/.test(next) ? next : fallback;
};

const hexWithAlpha = (value: string, alpha: string) => `${value}${alpha}`;

const resolveUserProfile = (user: ReturnType<typeof useAuth>["data"]): UserProfileSettings => ({
    firstName: user?.userDetail?.firstName ?? "",
    lastName: user?.userDetail?.lastName ?? "",
    username: user?.username ?? "",
    userPhoto: "",
});

const resolveAccountForm = (
    activeComplex: ResidentialComplex | null,
    localSettings: LocalAccountSettings | undefined
): AccountForm => ({
    nit: activeComplex?.nit ? String(activeComplex.nit) : "",
    complexName: activeComplex?.name ?? "Unidad residencial",
    complexSlug: activeComplex?.slug ?? "",
    phone: activeComplex?.phone ?? "",
    city: activeComplex?.city ?? "",
    state: activeComplex?.state ?? "",
    country: activeComplex?.country ?? "",
    address: activeComplex?.address ?? "",
    primaryColor: activeComplex?.primaryColor ?? DEFAULT_ACCOUNT_FORM.primaryColor,
    secondaryColor: activeComplex?.secondaryColor ?? DEFAULT_ACCOUNT_FORM.secondaryColor,
    accentColor: localSettings?.accentColor ?? DEFAULT_LOCAL_ACCOUNT_SETTINGS.accentColor,
    surfaceColor: localSettings?.surfaceColor ?? DEFAULT_LOCAL_ACCOUNT_SETTINGS.surfaceColor,
    logo: localSettings?.logo ?? activeComplex?.logo ?? DEFAULT_LOCAL_ACCOUNT_SETTINGS.logo,
    welcomeText: localSettings?.welcomeText ?? DEFAULT_LOCAL_ACCOUNT_SETTINGS.welcomeText,
});

const buildLocalAccountSettings = (form: AccountForm): LocalAccountSettings => ({
    accentColor: sanitizeHex(form.accentColor, DEFAULT_LOCAL_ACCOUNT_SETTINGS.accentColor),
    surfaceColor: sanitizeHex(form.surfaceColor, DEFAULT_LOCAL_ACCOUNT_SETTINGS.surfaceColor),
    logo: form.logo,
    welcomeText: form.welcomeText.trim() || DEFAULT_LOCAL_ACCOUNT_SETTINGS.welcomeText,
});

const getInitials = (label: string) => {
    return label
        .split(" ")
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();
};

const normalizeUpdatedComplex = (
    response: UpdateResidentialComplexResponse,
    fallbackBody: UpdateResidentialComplexBody,
    activeComplex: ResidentialComplex
): ResidentialComplex => {
    const payload = "data" in response ? response.data : response;

    return {
        ...activeComplex,
        ...payload,
        ...fallbackBody,
        nit: Number(payload.nit ?? fallbackBody.nit ?? activeComplex.nit),
    };
};

const SettingsPage = () => {
    const userPhotoInputRef = useRef<HTMLInputElement | null>(null);
    const logoInputRef = useRef<HTMLInputElement | null>(null);
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const location = useLocation();
    const { complexSlug } = useParams();
    const activeComplex = useAppSelector(selectActiveComplex);
    const { data: authUser } = useAuth();
    const { mutate: updateResidentialComplex, isPending: isUpdatingAccount } = useUpdateResidentialComplex();

    const [activeTab, setActiveTab] = useState("account");
    const [profileForm, setProfileForm] = useState<UserProfileSettings>(DEFAULT_PROFILE_FORM);
    const [accountForm, setAccountForm] = useState<AccountForm>(DEFAULT_ACCOUNT_FORM);
    const [profileFeedback, setProfileFeedback] = useState("");
    const [accountFeedback, setAccountFeedback] = useState("");

    const complexStorageKey = activeComplex?.id ?? "default";

    useEffect(() => {
        const storedUserProfile = readUserProfile();
        setProfileForm({
            ...resolveUserProfile(authUser),
            ...storedUserProfile,
        });
    }, [authUser]);

    useEffect(() => {
        const localSettings = readLocalAccountSettingsMap()[complexStorageKey];
        setAccountForm(resolveAccountForm(activeComplex, localSettings));
    }, [
        activeComplex?.address,
        activeComplex?.city,
        activeComplex?.country,
        activeComplex?.id,
        activeComplex?.logo,
        activeComplex?.name,
        activeComplex?.nit,
        activeComplex?.phone,
        activeComplex?.primaryColor,
        activeComplex?.secondaryColor,
        activeComplex?.slug,
        activeComplex?.state,
        complexStorageKey,
    ]);

    const fullUserName = [profileForm.firstName, profileForm.lastName].filter(Boolean).join(" ").trim() || "Usuario administrador";
    const userInitials = useMemo(() => getInitials(fullUserName), [fullUserName]);
    const previewInitials = useMemo(
        () => getInitials(accountForm.complexName.trim() || "Unidad residencial"),
        [accountForm.complexName]
    );

    const getAccountErrorMessage = (error: unknown) => {
        if (!error || typeof error !== "object") {
            return "No fue posible guardar la cuenta. Intenta de nuevo.";
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

        return candidate.message || candidate.error || "No fue posible guardar la cuenta. Intenta de nuevo.";
    };

    const handleProfileInputChange =
        (key: keyof UserProfileSettings) => (event: ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setProfileForm((prev) => ({
                ...prev,
                [key]: value,
            }));
            setProfileFeedback("");
        };

    const handleAccountInputChange =
        (
            key: keyof Pick<
                AccountForm,
                "nit" | "complexName" | "complexSlug" | "phone" | "city" | "state" | "country" | "address" | "welcomeText"
            >
        ) =>
        (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            const value = event.target.value;
            setAccountForm((prev) => ({
                ...prev,
                [key]: value,
            }));
            setAccountFeedback("");
        };

    const handleAccountColorChange =
        (key: keyof Pick<AccountForm, "primaryColor" | "secondaryColor" | "accentColor" | "surfaceColor">) =>
        (value: string) => {
            setAccountForm((prev) => ({
                ...prev,
                [key]: sanitizeHex(value, prev[key]),
            }));
            setAccountFeedback("");
        };

    const handleProfileImageChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setProfileForm((prev) => ({
                ...prev,
                userPhoto: String(reader.result ?? ""),
            }));
            setProfileFeedback("");
        };
        reader.readAsDataURL(file);
    };

    const handleAccountLogoChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = () => {
            setAccountForm((prev) => ({
                ...prev,
                logo: String(reader.result ?? ""),
            }));
            setAccountFeedback("");
        };
        reader.readAsDataURL(file);
    };

    const persistLocalAccountSettings = (form: AccountForm) => {
        const currentMap = readLocalAccountSettingsMap();
        saveLocalAccountSettingsMap({
            ...currentMap,
            [complexStorageKey]: buildLocalAccountSettings(form),
        });
    };

    const handleResetProfile = () => {
        const storedUserProfile = readUserProfile();
        setProfileForm({
            ...resolveUserProfile(authUser),
            ...storedUserProfile,
        });
        setProfileFeedback("");
    };

    const handleResetAccount = () => {
        const localSettings = readLocalAccountSettingsMap()[complexStorageKey];
        setAccountForm(resolveAccountForm(activeComplex, localSettings));
        setAccountFeedback("");
    };

    const handleSaveProfile = () => {
        const nextProfile: UserProfileSettings = {
            firstName: profileForm.firstName.trim(),
            lastName: profileForm.lastName.trim(),
            username: profileForm.username.trim() || authUser?.username || "",
            userPhoto: profileForm.userPhoto,
        };

        localStorage.setItem(SETTINGS_STORAGE_KEYS.USER_PROFILE, JSON.stringify(nextProfile));
        localStorage.setItem(
            SETTINGS_STORAGE_KEYS.USER_DISPLAY_NAME,
            [nextProfile.firstName, nextProfile.lastName].filter(Boolean).join(" ").trim()
        );

        setProfileForm(nextProfile);
        setProfileFeedback("Perfil guardado correctamente.");
        window.dispatchEvent(new Event(SETTINGS_EVENTS.UPDATED));
    };

    const handleSaveAccount = () => {
        if (!activeComplex?.id) {
            persistLocalAccountSettings(accountForm);
            setAccountFeedback("No se encontro una unidad activa; solo se guardaron los ajustes locales.");
            window.dispatchEvent(new Event(SETTINGS_EVENTS.UPDATED));
            return;
        }

        const requiredFields = [
            { label: "NIT", value: accountForm.nit.trim() },
            { label: "Nombre de la unidad", value: accountForm.complexName.trim() },
            { label: "Slug", value: accountForm.complexSlug.trim() || activeComplex.slug },
            { label: "Telefono", value: accountForm.phone.trim() },
            { label: "Ciudad", value: accountForm.city.trim() },
            { label: "Departamento", value: accountForm.state.trim() },
            { label: "Pais", value: accountForm.country.trim() },
            { label: "Direccion", value: accountForm.address.trim() },
        ];

        const missingFields = requiredFields.filter((field) => field.value.length === 0);
        if (missingFields.length > 0) {
            setAccountFeedback(`Completa estos campos antes de guardar: ${missingFields.map((field) => field.label).join(", ")}.`);
            return;
        }

        if (Number.isNaN(Number(accountForm.nit.trim()))) {
            setAccountFeedback("El NIT debe ser numerico.");
            return;
        }

        const normalizedPayload = {
            nit: Number(accountForm.nit.trim()),
            name: accountForm.complexName.trim() || "Unidad residencial",
            phone: accountForm.phone.trim(),
            address: accountForm.address.trim(),
            city: accountForm.city.trim(),
            state: accountForm.state.trim(),
            country: accountForm.country.trim(),
            primaryColor: sanitizeHex(accountForm.primaryColor, DEFAULT_ACCOUNT_FORM.primaryColor),
            secondaryColor: sanitizeHex(accountForm.secondaryColor, DEFAULT_ACCOUNT_FORM.secondaryColor),
        };

        const payload: UpdateResidentialComplexBody = {};

        if (normalizedPayload.nit !== activeComplex.nit) payload.nit = normalizedPayload.nit;
        if (normalizedPayload.name !== activeComplex.name) payload.name = normalizedPayload.name;
        if (normalizedPayload.phone !== activeComplex.phone) payload.phone = normalizedPayload.phone;
        if (normalizedPayload.address !== activeComplex.address) payload.address = normalizedPayload.address;
        if (normalizedPayload.city !== activeComplex.city) payload.city = normalizedPayload.city;
        if (normalizedPayload.state !== activeComplex.state) payload.state = normalizedPayload.state;
        if (normalizedPayload.country !== activeComplex.country) payload.country = normalizedPayload.country;
        if (normalizedPayload.primaryColor !== activeComplex.primaryColor) payload.primaryColor = normalizedPayload.primaryColor;
        if (normalizedPayload.secondaryColor !== activeComplex.secondaryColor) payload.secondaryColor = normalizedPayload.secondaryColor;

        const nextAccountForm: AccountForm = {
            ...accountForm,
            nit: String(normalizedPayload.nit),
            complexName: normalizedPayload.name,
            complexSlug: accountForm.complexSlug.trim() || activeComplex.slug,
            phone: normalizedPayload.phone,
            address: normalizedPayload.address,
            city: normalizedPayload.city,
            state: normalizedPayload.state,
            country: normalizedPayload.country,
            primaryColor: normalizedPayload.primaryColor ?? DEFAULT_ACCOUNT_FORM.primaryColor,
            secondaryColor: normalizedPayload.secondaryColor ?? DEFAULT_ACCOUNT_FORM.secondaryColor,
            accentColor: sanitizeHex(accountForm.accentColor, DEFAULT_LOCAL_ACCOUNT_SETTINGS.accentColor),
            surfaceColor: sanitizeHex(accountForm.surfaceColor, DEFAULT_LOCAL_ACCOUNT_SETTINGS.surfaceColor),
            logo: accountForm.logo,
            welcomeText: accountForm.welcomeText.trim() || DEFAULT_LOCAL_ACCOUNT_SETTINGS.welcomeText,
        };

        if (Object.keys(payload).length === 0) {
            persistLocalAccountSettings(nextAccountForm);
            setAccountForm(nextAccountForm);
            setAccountFeedback("No habia cambios de backend por guardar. Se actualizaron los ajustes locales.");
            window.dispatchEvent(new Event(SETTINGS_EVENTS.UPDATED));
            return;
        }

        updateResidentialComplex(
            {
                id: activeComplex.id,
                body: payload,
            },
            {
                onSuccess: async (response) => {
                    persistLocalAccountSettings(nextAccountForm);

                    let nextComplex = normalizeUpdatedComplex(response, payload, activeComplex);

                    try {
                        const refreshed = await queryClient.fetchQuery({
                            queryKey: ["my-residential-complexes"],
                            queryFn: getMyResidentialComplexes,
                        });
                        const refreshedList = refreshed.data ?? [];
                        const refreshedComplex = refreshedList.find((complex) => complex.id === activeComplex.id);

                        if (refreshedList.length > 0) {
                            dispatch(setComplexes(refreshedList));
                        }

                        if (refreshedComplex) {
                            nextComplex = refreshedComplex;
                        }
                    } catch {
                        // Si el refetch falla, conservamos el fallback local con la respuesta del PATCH.
                    }

                    dispatch(setActiveComplex(nextComplex));
                    setAccountForm({
                        ...nextAccountForm,
                        complexSlug: nextComplex.slug,
                    });
                    setAccountFeedback("Cuenta guardada correctamente.");
                    window.dispatchEvent(new Event(SETTINGS_EVENTS.UPDATED));

                    if (complexSlug && nextComplex.slug && complexSlug !== nextComplex.slug) {
                        navigate(location.pathname.replace(`/${complexSlug}`, `/${nextComplex.slug}`), { replace: true });
                    }
                },
                onError: (error) => {
                    setAccountFeedback(getAccountErrorMessage(error));
                },
            }
        );
    };

    const colorFields = [
        {
            key: "primaryColor" as const,
            label: "Color primario",
            helper: "Botones principales y acciones de marca.",
        },
        {
            key: "secondaryColor" as const,
            label: "Color secundario",
            helper: "Apoyos visuales, resaltes y fondos suaves.",
        },
        {
            key: "accentColor" as const,
            label: "Color acento",
            helper: "Detalles decorativos y superficies destacadas.",
        },
        {
            key: "surfaceColor" as const,
            label: "Color de fondo",
            helper: "Base visual para tarjetas y contenedores.",
        },
    ];

    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-2xl font-semibold text-brand-title">{TITLE_MODULE.SETTINGS}</h2>
                <p className="text-sm text-slate-400">
                    Ajusta perfil y cuenta desde flujos separados, listos para conectarse a endpoints distintos.
                </p>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.4fr_0.9fr]">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
                    <div className="flex justify-center xl:justify-start">
                        <TabsList>
                            <TabsTrigger value="account">Cuenta</TabsTrigger>
                            <TabsTrigger value="profile">Perfil</TabsTrigger>
                        </TabsList>
                    </div>

                    <TabsContent value="account" className="space-y-6">
                        {accountFeedback ? (
                            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                                {accountFeedback}
                            </div>
                        ) : null}

                        <Card className="border-slate-200 shadow-none">
                            <CardHeader>
                                <CardTitle>Informacion de la unidad</CardTitle>
                                <CardDescription>
                                    Este bloque queda alineado con el endpoint de cuenta de la unidad residencial.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                <div className="grid gap-5 md:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label htmlFor="nit">NIT</Label>
                                        <Input
                                            id="nit"
                                            value={accountForm.nit}
                                            onChange={handleAccountInputChange("nit")}
                                            placeholder="900123001"
                                            className="h-11 border-slate-200 bg-slate-50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="complexName">Nombre de la unidad</Label>
                                        <Input
                                            id="complexName"
                                            value={accountForm.complexName}
                                            onChange={handleAccountInputChange("complexName")}
                                            placeholder="Kibuz Residential Complex"
                                            className="h-11 border-slate-200 bg-slate-50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="complexSlug">Slug</Label>
                                        <Input
                                            id="complexSlug"
                                            value={accountForm.complexSlug}
                                            onChange={handleAccountInputChange("complexSlug")}
                                            placeholder="kibuz-residential-complex"
                                            disabled
                                            className="h-11 border-slate-200 bg-slate-50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="phone">Telefono</Label>
                                        <Input
                                            id="phone"
                                            value={accountForm.phone}
                                            onChange={handleAccountInputChange("phone")}
                                            placeholder="6043214567"
                                            className="h-11 border-slate-200 bg-slate-50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="city">Ciudad</Label>
                                        <Input
                                            id="city"
                                            value={accountForm.city}
                                            onChange={handleAccountInputChange("city")}
                                            placeholder="Medellin"
                                            className="h-11 border-slate-200 bg-slate-50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="state">Departamento</Label>
                                        <Input
                                            id="state"
                                            value={accountForm.state}
                                            onChange={handleAccountInputChange("state")}
                                            placeholder="Antioquia"
                                            className="h-11 border-slate-200 bg-slate-50"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="country">Pais</Label>
                                        <Input
                                            id="country"
                                            value={accountForm.country}
                                            onChange={handleAccountInputChange("country")}
                                            placeholder="Colombia"
                                            className="h-11 border-slate-200 bg-slate-50"
                                        />
                                    </div>
                                    <div className="space-y-2 md:col-span-2">
                                        <Label htmlFor="address">Direccion</Label>
                                        <Input
                                            id="address"
                                            value={accountForm.address}
                                            onChange={handleAccountInputChange("address")}
                                            placeholder="Calle 45 #78-21"
                                            className="h-11 border-slate-200 bg-slate-50"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="welcomeText">Texto de apoyo</Label>
                                    <Textarea
                                        id="welcomeText"
                                        value={accountForm.welcomeText}
                                        onChange={handleAccountInputChange("welcomeText")}
                                        placeholder="Mensaje corto para la vista previa"
                                        className="min-h-28 border-slate-200 bg-slate-50"
                                    />
                                </div>
                            </CardContent>
                            <CardFooter className="justify-end gap-3">
                                <Button type="button" variant="outline" className="cursor-pointer" onClick={handleResetAccount}>
                                    Restablecer
                                </Button>
                                <Button
                                    type="button"
                                    disabled={isUpdatingAccount}
                                    className="cursor-pointer border border-transparent bg-brand-primary text-white hover:border-brand-primary hover:bg-white hover:text-brand-primary disabled:cursor-not-allowed disabled:opacity-60"
                                    onClick={handleSaveAccount}
                                >
                                    {isUpdatingAccount ? "Guardando..." : "Guardar cuenta"}
                                </Button>
                            </CardFooter>
                        </Card>

                        <Card className="border-slate-200 shadow-none">
                            <CardHeader>
                                <CardTitle>Colores de marca</CardTitle>
                                <CardDescription>
                                    Los colores primario y secundario viajan al backend; acento y fondo siguen locales por ahora.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-4 md:grid-cols-2">
                                {colorFields.map((field) => (
                                    <div key={field.key} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                                        <div className="mb-3 flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-medium text-slate-800">{field.label}</p>
                                                <p className="text-xs text-slate-400">{field.helper}</p>
                                            </div>
                                            <span
                                                className="h-8 w-8 rounded-full border border-white shadow-sm"
                                                style={{ backgroundColor: accountForm[field.key] }}
                                            />
                                        </div>

                                        <div className="flex gap-3">
                                            <Input
                                                type="color"
                                                value={accountForm[field.key]}
                                                onChange={(event) => handleAccountColorChange(field.key)(event.target.value)}
                                                className="h-11 w-16 cursor-pointer border-slate-200 bg-white p-1"
                                            />
                                            <Input
                                                value={accountForm[field.key]}
                                                onChange={(event) => handleAccountColorChange(field.key)(event.target.value)}
                                                className="h-11 border-slate-200 bg-white font-mono uppercase"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </CardContent>
                        </Card>

                        <Card className="border-slate-200 shadow-none">
                            <CardHeader>
                                <CardTitle>Logo</CardTitle>
                                <CardDescription>
                                    El logo se conserva localmente hasta definir una estrategia real de upload y storage.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <input
                                    ref={logoInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleAccountLogoChange}
                                />

                                <div className="flex flex-col gap-4 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5 md:flex-row md:items-center md:justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm">
                                            {accountForm.logo ? (
                                                <img src={accountForm.logo} alt="Logo cargado" className="h-full w-full object-contain" />
                                            ) : (
                                                <span className="text-lg font-semibold text-slate-600">{previewInitials}</span>
                                            )}
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-slate-800">Logo de la unidad</p>
                                            <p className="text-xs text-slate-400">
                                                Recomendado: fondo transparente y formato PNG o SVG exportado.
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <Button type="button" variant="outline" className="cursor-pointer" onClick={() => logoInputRef.current?.click()}>
                                            Cargar logo
                                        </Button>
                                        <Button
                                            type="button"
                                            variant="ghost"
                                            className="cursor-pointer text-slate-500"
                                            onClick={() => {
                                                setAccountForm((prev) => ({ ...prev, logo: "" }));
                                                setAccountFeedback("");
                                            }}
                                        >
                                            Quitar
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="profile" className="space-y-6">
                        {profileFeedback ? (
                            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
                                {profileFeedback}
                            </div>
                        ) : null}

                        <Card className="border-slate-200 shadow-none">
                            <CardHeader>
                                <CardTitle>Informacion de la persona</CardTitle>
                                <CardDescription>
                                    Este formulario queda separado para conectarse despues al endpoint de perfil del usuario.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-5">
                                <input
                                    ref={userPhotoInputRef}
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={handleProfileImageChange}
                                />

                                <div className="grid gap-5 md:grid-cols-[1.1fr_0.9fr]">
                                    <div className="grid gap-5 md:grid-cols-2">
                                        <div className="space-y-2">
                                            <Label htmlFor="firstName">Nombre</Label>
                                            <Input
                                                id="firstName"
                                                value={profileForm.firstName}
                                                onChange={handleProfileInputChange("firstName")}
                                                placeholder="Ej. Andres"
                                                className="h-11 border-slate-200 bg-slate-50"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="lastName">Apellido</Label>
                                            <Input
                                                id="lastName"
                                                value={profileForm.lastName}
                                                onChange={handleProfileInputChange("lastName")}
                                                placeholder="Ej. Alzate"
                                                className="h-11 border-slate-200 bg-slate-50"
                                            />
                                        </div>
                                        <div className="space-y-2 md:col-span-2">
                                            <Label htmlFor="username">Nombre de usuario</Label>
                                            <Input
                                                id="username"
                                                value={profileForm.username}
                                                onChange={handleProfileInputChange("username")}
                                                placeholder="Ej. andres.alzate"
                                                className="h-11 border-slate-200 bg-slate-50"
                                            />
                                        </div>
                                    </div>

                                    <div className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-5">
                                        <div className="flex items-center gap-4">
                                            <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-sm">
                                                {profileForm.userPhoto ? (
                                                    <img src={profileForm.userPhoto} alt="Foto del usuario" className="h-full w-full object-cover" />
                                                ) : (
                                                    <span className="text-lg font-semibold text-slate-600">{userInitials}</span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-sm font-medium text-slate-800">Foto del usuario</p>
                                                <p className="text-xs text-slate-400">
                                                    Usa una imagen cuadrada para que el avatar del topbar se vea mejor.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="mt-4 flex gap-3">
                                            <Button type="button" variant="outline" className="cursor-pointer" onClick={() => userPhotoInputRef.current?.click()}>
                                                Cargar foto
                                            </Button>
                                            <Button
                                                type="button"
                                                variant="ghost"
                                                className="cursor-pointer text-slate-500"
                                                onClick={() => {
                                                    setProfileForm((prev) => ({ ...prev, userPhoto: "" }));
                                                    setProfileFeedback("");
                                                }}
                                            >
                                                Quitar
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                            <CardFooter className="justify-end gap-3">
                                <Button type="button" variant="outline" className="cursor-pointer" onClick={handleResetProfile}>
                                    Restablecer
                                </Button>
                                <Button
                                    type="button"
                                    className="cursor-pointer border border-transparent bg-brand-primary text-white hover:border-brand-primary hover:bg-white hover:text-brand-primary"
                                    onClick={handleSaveProfile}
                                >
                                    Guardar perfil
                                </Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>

                <div className="space-y-6">
                    <Card className="border-slate-200 shadow-none">
                        <CardHeader>
                            <CardTitle>Vista previa</CardTitle>
                            <CardDescription>
                                La preview permanece visible mientras cambias de tab para comparar perfil y cuenta en contexto.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div
                                className="overflow-hidden rounded-3xl border p-5"
                                style={{
                                    background: `linear-gradient(135deg, ${accountForm.surfaceColor} 0%, ${hexWithAlpha(accountForm.accentColor, "55")} 100%)`,
                                    borderColor: hexWithAlpha(accountForm.secondaryColor, "33"),
                                }}
                            >
                                <div className="rounded-2xl bg-white/80 p-5 shadow-sm backdrop-blur-sm">
                                    <div className="flex items-start justify-between gap-4">
                                        <div className="flex items-center gap-3">
                                            <div
                                                className="flex h-14 w-14 items-center justify-center overflow-hidden rounded-2xl"
                                                style={{ backgroundColor: hexWithAlpha(accountForm.primaryColor, "18") }}
                                            >
                                                {accountForm.logo ? (
                                                    <img src={accountForm.logo} alt="Preview logo" className="h-full w-full object-contain" />
                                                ) : (
                                                    <span className="text-base font-semibold" style={{ color: accountForm.primaryColor }}>
                                                        {previewInitials}
                                                    </span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Unidad</p>
                                                <h3 className="text-lg font-semibold text-slate-900">
                                                    {accountForm.complexName || "Unidad residencial"}
                                                </h3>
                                                <p className="text-xs text-slate-400">/{accountForm.complexSlug || "slug-de-la-unidad"}</p>
                                            </div>
                                        </div>

                                        <span
                                            className="rounded-full px-3 py-1 text-xs font-medium"
                                            style={{
                                                backgroundColor: hexWithAlpha(accountForm.secondaryColor, "18"),
                                                color: accountForm.secondaryColor,
                                            }}
                                        >
                                            Configuracion activa
                                        </span>
                                    </div>

                                    <Separator className="my-5" />

                                    <div className="space-y-4">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full bg-slate-100">
                                                {profileForm.userPhoto ? (
                                                    <img src={profileForm.userPhoto} alt="Preview usuario" className="h-full w-full object-cover" />
                                                ) : (
                                                    <span className="text-sm font-semibold text-slate-600">{userInitials}</span>
                                                )}
                                            </div>
                                            <div>
                                                <p className="text-base font-medium text-slate-900">{fullUserName}</p>
                                                <p className="text-xs text-slate-400">@{profileForm.username || "usuario.admin"}</p>
                                            </div>
                                        </div>

                                        <p className="text-sm leading-6 text-slate-600">
                                            {accountForm.welcomeText || DEFAULT_LOCAL_ACCOUNT_SETTINGS.welcomeText}
                                        </p>

                                        <div className="flex flex-wrap gap-3">
                                            <Button
                                                type="button"
                                                className="cursor-default rounded-md border border-transparent text-white shadow-none"
                                                style={{ backgroundColor: accountForm.primaryColor }}
                                            >
                                                Boton primary
                                            </Button>
                                            <Button
                                                type="button"
                                                className="cursor-default rounded-md border border-transparent text-white shadow-none"
                                                style={{ backgroundColor: accountForm.secondaryColor }}
                                            >
                                                Boton secondary
                                            </Button>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3">
                                            <div
                                                className="rounded-2xl p-4"
                                                style={{ backgroundColor: hexWithAlpha(accountForm.primaryColor, "10") }}
                                            >
                                                <p className="text-xs text-slate-500">Primario</p>
                                                <p className="mt-2 font-mono text-sm font-medium" style={{ color: accountForm.primaryColor }}>
                                                    {accountForm.primaryColor}
                                                </p>
                                            </div>
                                            <div
                                                className="rounded-2xl p-4"
                                                style={{ backgroundColor: hexWithAlpha(accountForm.secondaryColor, "10") }}
                                            >
                                                <p className="text-xs text-slate-500">Secundario</p>
                                                <p className="mt-2 font-mono text-sm font-medium" style={{ color: accountForm.secondaryColor }}>
                                                    {accountForm.secondaryColor}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                        <CardFooter className="flex-col items-start gap-2">
                            <p className="text-sm font-medium text-slate-700">Lo que se guarda en esta version</p>
                            <p className="text-xs text-slate-500">
                                Cuenta persiste backend para campos soportados y mantiene locales los ajustes que aun no existen en el back.
                            </p>
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default SettingsPage;
