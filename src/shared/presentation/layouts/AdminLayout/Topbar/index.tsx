import { useEffect } from "react";
import { generatePath, useLocation, useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/shared/application/store/hooks";
import { useAuth } from "@/domains/auth_domain/application/hooks/useAuth"
import { useLogout } from "@/domains/auth_domain/application/hooks/useLogout"
import { loginRoute } from "@/domains/auth_domain/infrastructure/routes"
import { selectResidentialComplexes, selectActiveComplex } from "@/domains/residential_complex_domain/application/redux/selectors/residentialComplexSelector";
import { useMyResidentialComplexes } from "@/domains/residential_complex_domain/application/hooks/useResidentialComplexes";
import { setActiveComplex, setComplexes } from "@/domains/residential_complex_domain/application/redux/slices/residentialComplexSlice";
import { dashboardRoute } from "@/domains/dashboard_domain/infrastructure/routes";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select"

import { Input } from "@/components/ui/input"

import {
    Avatar,
    AvatarImage,
AvatarFallback
} from "@/components/ui/avatar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { withAlpha } from "@/shared/application/utils/commonCunctions";
// import { selectAuthUser } from "@/domains/auth_domain/application/redux/selectors/authSelector"

export default function Topbar() {
    const navigate = useNavigate();
    const location = useLocation();
    const { complexSlug } = useParams();
    const { data: user } = useAuth();
    const { mutate: logout } = useLogout();
    const dispatch = useAppDispatch();
    const complexes = useAppSelector(selectResidentialComplexes);
    const activeComplex = useAppSelector(selectActiveComplex);
    const shouldFetch = complexes.length === 0 && !!user;
    const { data: complexesResponse } = useMyResidentialComplexes(shouldFetch);

    useEffect(() => {
        if (!complexesResponse?.data || complexes.length > 0) return;
        dispatch(setComplexes(complexesResponse.data));
    }, [complexesResponse, complexes.length, dispatch]);

    const handleLogout = () => {
        logout(undefined, {
            onSuccess: () => {
            navigate(loginRoute);
            },
        });
    };

    return (

        <header className="bg-white px-6 h-16 flex items-center justify-between rounded-3xl">

        {/* SEARCH */}

        <div className="relative w-72">

            <i className="ri-search-line absolute left-3 top-1 text-gray-400"></i>

            <Input
            placeholder="Buscar..."
            className="pl-10 bg-gray-100 border-none"
            />

        </div>

        <div className="flex items-center gap-4">

            {/* SELECTOR UNIDAD */}

            <Select
                value={activeComplex?.slug || complexSlug || ""}
                onValueChange={(slug) => {
                    const selected = complexes.find((c) => c.slug === slug);
                    if (selected) dispatch(setActiveComplex(selected));

                    if (complexSlug) {
                        navigate(location.pathname.replace(`/${complexSlug}`, `/${slug}`));
                    } else {
                        navigate(generatePath(dashboardRoute, { complexSlug: slug }));
                    }
                }}
            >

            <SelectTrigger className="w-[200px] bg-gray-100 border-none text-brand-primary focus-visible:ring-0 shadow-none" style={{ backgroundColor: activeComplex ? withAlpha(activeComplex?.primaryColor) : '' }}>
                <SelectValue placeholder="Selecciona unidad" />
            </SelectTrigger>

            <SelectContent>
                {complexes.map((complex) => (
                    <SelectItem key={complex.id} value={complex.slug}>
                        {complex.name}
                    </SelectItem>
                ))}

            </SelectContent>

            </Select>

            {/* NOTIFICATIONS */}

            <button className="p-2 w-10 h-10 bg-gray-100 hover:bg-gray-100 rounded-full">
                <i className="ri-notification-3-line text-brand-primary"></i>
            </button>

            {/* USER */}

            <DropdownMenu>

            <DropdownMenuTrigger className="text-left">

                <div className="flex items-center gap-3 cursor-pointer">

                <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/40" />
                    <AvatarFallback>PH</AvatarFallback>
                </Avatar>

                <div className="text-sm hidden md:block">

                    <p className="font-medium">
                        {user?.userDetail?.firstName} {user?.userDetail?.lastName}
                    </p>

                    <p className="text-gray-500 text-xs">
                        @{user?.username}
                    </p>

                    {/* <p className="text-gray-500 text-xs">
                        {user?.email}
                    </p> */}

                </div>

                </div>

            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

                <DropdownMenuItem onClick={() => {}} className="cursor-pointer">
                    Perfil
                </DropdownMenuItem>

                <DropdownMenuItem onClick={() => {}} className="cursor-pointer">
                    Configuración
                </DropdownMenuItem>

                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                    Cerrar sesión
                </DropdownMenuItem>

            </DropdownMenuContent>

            </DropdownMenu>

        </div>

        </header>
    )
}
