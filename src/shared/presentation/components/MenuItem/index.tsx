import { NavLink } from "react-router-dom"
import type { Props } from "./types"
import { useAppSelector } from "@/shared/application/store/hooks";
import { selectActiveComplex } from "@/domains/residential_complex_domain/application/redux/selectors/residentialComplexSelector";
import { withAlpha } from "@/shared/application/utils/commonCunctions";

const MenuItem = ({
    icon,
    label,
    collapsed,
    to,
    onClick,
    isOpen
}: Props) => {
    const activeComplex = useAppSelector(selectActiveComplex);

    const baseClass = `
        flex items-center
        ${collapsed ? "justify-center" : "gap-3"}
        px-3 py-2 rounded-xl cursor-pointer transition-all duration-200
    `;

    // ✅ CASO: ITEM CON RUTA (NO TOCAR TU ESTILO)
    if (to) {
        return (
        <NavLink
            to={to}
            className={({ isActive }) => `
            ${baseClass}
            ${
                isActive
                ? "text-brand-primary bg-gray-200 rounded-xl"
                : "text-gray-600 hover:bg-gray-100"
            }
            `}
            style={({ isActive }) => ({
            backgroundColor: isActive
                ? withAlpha(activeComplex?.primaryColor)
                : "",
            })}
        >
            <i className={`${icon} text-lg`} />

            {!collapsed && (
            <span className="text-sm font-medium whitespace-nowrap">
                {label}
            </span>
            )}
        </NavLink>
        );
    }

    // ✅ CASO: PADRE (SUBMENÚ) → MISMO ESTILO, SIN NavLink
    return (
        <div
        onClick={onClick}
        className={`
            ${baseClass}
            text-gray-600 hover:bg-gray-100
        `}
        >
        <i className={`${icon} text-lg`} />

        {!collapsed && (
            <>
            <span className="text-sm font-medium whitespace-nowrap">
                {label}
            </span>

            {/* 👇 indicador opcional */}
            <span className="ml-auto text-xs">
                <i className={`transition-all duration-200 ${isOpen ? 'ri-subtract-line' : 'ri-add-line'}`}></i>
            </span>
            </>
        )}
        </div>
    );
};

export default MenuItem;