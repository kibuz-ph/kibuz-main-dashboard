import { useAppSelector } from "@/shared/application/store/hooks"

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
import { selectAuthUser } from "@/domains/auth_domain/application/selectors/authSelector"

export default function Topbar() {
    const authUser = useAppSelector(selectAuthUser);

    return (

        <header className="bg-white px-6 h-16 flex items-center justify-between border-b">

        {/* SEARCH */}

        <div className="relative w-72">

            <i className="ri-search-line absolute left-3 top-2.5 text-gray-400"></i>

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
                        {authUser?.firstName} {authUser?.lastName}
                    </p>

                    <p className="text-gray-500 text-xs">
                        {authUser?.email}
                    </p>

                </div>

                </div>

            </DropdownMenuTrigger>

            <DropdownMenuContent align="end">

                <DropdownMenuItem>
                Perfil
                </DropdownMenuItem>

                <DropdownMenuItem>
                Configuración
                </DropdownMenuItem>

                <DropdownMenuItem>
                Cerrar sesión
                </DropdownMenuItem>

            </DropdownMenuContent>

            </DropdownMenu>

        </div>

        </header>
    )
}