import type { Props } from "@/shared/presentation/layouts/AdminLayout/Sidebar/types"
import MenuItem from "@/shared/presentation/components/MenuItem"
import { ICON_GENERAL_SECTIONS } from "@/shared/application/constants/icons"
import { NAME_GENERAL_SECTIONS } from "@/shared/application/constants/appData"
import NavItems from "@/shared/presentation/layouts/AdminLayout/Sidebar/NavItems";
import { SIDE_BAR_ITEMS } from "@/shared/application/constants/sidebarData";
import { useAppSelector } from "@/shared/application/store/hooks";
import { selectActiveComplex } from "@/domains/residential_complex_domain/application/redux/selectors/residentialComplexSelector";
import { generatePath, useParams } from "react-router-dom";
import { settingsRoute } from "@/domains/settings_domain/infrastructure/routes";

const Sidebar = ({ collapsed, setCollapsed }: Props) => {
    const { complexSlug } = useParams();
    const activeComplex = useAppSelector(selectActiveComplex);
    const slug = complexSlug || activeComplex?.slug;
    const settingsPath = slug ? generatePath(settingsRoute, { complexSlug: slug }) : "/";
    const logoSrc = activeComplex?.logo || (collapsed ? "/src/assets/isologo-original-kibuz.svg" : "/src/assets/logo-svg-original.svg");

    return (
        <aside className={`bg-white rounded-3xl transition-[width] duration-200 ease-in-out flex flex-col ${collapsed ? "w-20" : "w-64"}`}>

            {/* HEADER */}

            <div className={`h-16 flex items-center px-4 ${collapsed ? "justify-center" : "justify-between"} relative`}>
                <div className="flex items-center gap-2 overflow-hidden">
                    {/* <i className="ri-building-line text-xl text-brand-primary"></i> */}
                    {collapsed && <img src={logoSrc} alt="Kibuz Logo" className="h-6 w-auto object-contain" />}
                    {!collapsed && (
                        // <span className="font-semibold text-gray-700 whitespace-nowrap">
                        // Kibuz Platform
                        // </span>
                        <img src={logoSrc} alt="Kibuz Logo" className="h-8 w-auto object-contain" />
                    )}
                </div>
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute right-[-8px] p-1 rounded-lg bg-white hover:bg-gray-100"
                >
                    <i
                        className={`${
                        collapsed
                            ? "ri-arrow-right-s-line"
                            : "ri-arrow-left-s-line"
                        } text-lg cursor-pointer text-brand-primary`}
                    />
                </button>
            </div>

            {/* MENU */}

            <nav className="flex-1 mt-4 px-2 space-y-1">
                {SIDE_BAR_ITEMS('ADMIN', slug).map((item, index) => {
                    return <NavItems key={index} item={item} collapsed={collapsed} />
                })}
            </nav>

            {/* FOOTER */}

            <div className="border-t border-app-background py-3 mx-3">
                <MenuItem
                    icon={ICON_GENERAL_SECTIONS.CONFIG_SECTION}
                    label={NAME_GENERAL_SECTIONS.CONFIG}
                    collapsed={collapsed}
                    to={settingsPath}
                />
            </div>
        </aside>
    )
};

export default Sidebar;
