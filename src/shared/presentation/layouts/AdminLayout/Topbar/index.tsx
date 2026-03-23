import { useNavigate } from "react-router-dom"
// import { useAppSelector } from "@/shared/application/store/hooks"
import { useAuth } from "@/domains/auth_domain/application/hooks/useAuth"
import { useLogout } from "@/domains/auth_domain/application/hooks/useLogout"
import { loginRoute } from "@/domains/auth_domain/infrastructure/routes"

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
// import { selectAuthUser } from "@/domains/auth_domain/application/redux/selectors/authSelector"

export default function Topbar() {
    const navigate = useNavigate();
    const { data: user } = useAuth();
    const { mutate: logout } = useLogout();

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

            <Select defaultValue="unidad1">

            <SelectTrigger className="w-[200px] bg-gray-100 border-none">
                <SelectValue />
            </SelectTrigger>

            <SelectContent>

                <SelectItem value="unidad1">
                Faro Verde
                </SelectItem>

                <SelectItem value="unidad2">
                Fiorenza
                </SelectItem>

                <SelectItem value="unidad3">
                Cerezos
                </SelectItem>

            </SelectContent>

            </Select>

            {/* NOTIFICATIONS */}

            <button className="p-2 hover:bg-gray-100 rounded-xl">
            <i className="ri-notification-3-line"></i>
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