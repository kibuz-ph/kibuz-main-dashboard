import { NavLink } from "react-router-dom"
import type { Props } from "./types"
import { useAppSelector } from "@/shared/application/store/hooks";
import { selectActiveComplex } from "@/domains/residential_complex_domain/application/redux/selectors/residentialComplexSelector";
import { withAlpha } from "@/shared/application/utils/commonCunctions";

const MenuItem = ({
    icon,
    label,
    collapsed,
    to
}: Props) => {
    const activeComplex = useAppSelector(selectActiveComplex);

    return (
        <NavLink
            to={to}
            className={({ isActive }) => `
                flex items-center
                ${collapsed ? "justify-center" : "gap-3"}
                px-3 py-2 rounded-xl cursor-pointer transition-colors
                ${
                    isActive
                    ? "text-brand-primary"
                    : "text-gray-600 hover:bg-gray-100"
                }
            `}
            style={({ isActive }) => ({
                backgroundColor: isActive ? withAlpha(activeComplex?.primaryColor) : '',
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
};

export default MenuItem;