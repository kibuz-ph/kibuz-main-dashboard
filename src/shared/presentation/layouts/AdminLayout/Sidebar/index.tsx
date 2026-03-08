import type { Props } from "@/shared/presentation/layouts/AdminLayout/Sidebar/types"
import MenuItem from "@/shared/presentation/components/MenuItem"
import { ICON_GENERAL_SECTIONS } from "@/shared/application/constants/icons"
import { NAME_GENERAL_SECTIONS } from "@/shared/application/constants/appData"
import NavItems from "@/shared/presentation/layouts/AdminLayout/Sidebar/NavItems";
import { SIDE_BAR_ITEMS } from "@/shared/application/constants/sidebarData";

const Sidebar = ({ collapsed, setCollapsed }: Props) => {

    return (
        <aside className={`bg-white rounded-3xl transition-[width] duration-200 ease-in-out flex flex-col ${collapsed ? "w-20" : "w-64"}`}>

            {/* HEADER */}

            <div className="h-16 flex items-center px-4 justify-between">
                <div className="flex items-center gap-2 overflow-hidden">
                    <i className="ri-building-line text-xl text-green-700"></i>
                    {!collapsed && (
                        <span className="font-semibold text-gray-700 whitespace-nowrap">
                        Kibuz Platform
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
                {SIDE_BAR_ITEMS('ADMIN').map((item, index) => {
                    return <NavItems key={index} item={item} collapsed={collapsed} />
                })}
                {/* <MenuItem
                    icon={ICON_MODULE.DASHBOARD_MODULE}
                    label={NAME_MODULE.DASHBOARD}
                    collapsed={collapsed}
                    to="/dashboard"
                    // active={true}
                />
                <MenuItem
                    icon={ICON_MODULE.RESIDENTIAL_COMPLEX_MODULE}
                    label={NAME_MODULE.RESIDENTIAL_COMPLEX}
                    collapsed={collapsed}
                    to="/dashboard"
                />
                <MenuItem
                    icon={ICON_MODULE.RESIDENTS_MODULE}
                    label={NAME_MODULE.RESIDENTS}
                    collapsed={collapsed}
                    to="/dashboard"
                />
                <MenuItem
                    icon={ICON_MODULE.PARKING_LOTS_MODULE}
                    label={NAME_MODULE.PARKING_LOTS}
                    collapsed={collapsed}
                    to="/dashboard"
                /> */}
            </nav>

            {/* FOOTER */}

            <div className="border-t p-3">
                <MenuItem
                    icon={ICON_GENERAL_SECTIONS.CONFIG_SECTION}
                    label={NAME_GENERAL_SECTIONS.CONFIG}
                    collapsed={collapsed}
                    to="/dashboard"
                />
            </div>
        </aside>
    )
};

export default Sidebar;