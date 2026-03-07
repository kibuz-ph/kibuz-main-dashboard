// import MenuItem from "@/components/MenuItem"
// import {
// Avatar,
// AvatarImage,
// AvatarFallback
// } from "@/components/ui/avatar"

interface Props {
    collapsed: boolean
    setCollapsed: (value: boolean) => void
}

export default function Sidebar({ collapsed, setCollapsed }: Props) {

    return (

        <aside className={`bg-white rounded-3xl transition-[width] duration-200 ease-in-out flex flex-col ${collapsed ? "w-20" : "w-64"}`}>

        {/* HEADER */}

            <div className="h-16 flex items-center px-4 justify-between">

                <div className="flex items-center gap-2 overflow-hidden">

                <i className="ri-building-line text-xl text-green-700"></i>

                {!collapsed && (
                    <span className="font-semibold text-gray-700 whitespace-nowrap">
                    PH Admin
                    </span>
                )}

                </div>

                <button
                onClick={() => setCollapsed(!collapsed)}
                className="p-1 rounded-lg hover:bg-gray-100"
                >
                <i
                    className={`${
                    collapsed
                        ? "ri-arrow-right-s-line"
                        : "ri-arrow-left-s-line"
                    } text-lg`}
                />
                </button>

            </div>

            {/* MENU */}

            <nav className="flex-1 mt-4 px-2 space-y-1">

                {/* <MenuItem
                icon="ri-dashboard-line"
                label="Dashboard"
                collapsed={collapsed}
                active
                />

                <MenuItem
                icon="ri-user-3-line"
                label="Residentes"
                collapsed={collapsed}
                />

                <MenuItem
                icon="ri-bank-card-line"
                label="Pagos"
                collapsed={collapsed}
                />

                <MenuItem
                icon="ri-calendar-line"
                label="Reservas"
                collapsed={collapsed}
                />

                <MenuItem
                icon="ri-settings-3-line"
                label="Configuración"
                collapsed={collapsed}
                /> */}

            </nav>

            {/* FOOTER */}

            <div className="border-t p-3">

                <div
                className={`flex items-center ${collapsed ? "justify-center" : "gap-3"}`}
                >

                {/* <Avatar>
                    <AvatarImage src="https://i.pravatar.cc/40" />
                    <AvatarFallback>PH</AvatarFallback>
                </Avatar> */}

                {!collapsed && (
                    <div className="text-sm">
                    <p className="font-medium">
                        Admin PH
                    </p>

                    <p className="text-gray-500 text-xs">
                        admin@email.com
                    </p>
                    </div>
                )}

                </div>

            </div>

        </aside>
    )
}