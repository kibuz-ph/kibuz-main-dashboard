import { NavLink } from "react-router-dom"
import type { Props } from "./types"

const MenuItem = ({
    icon,
    label,
    collapsed,
    to
}: Props) => {

    return (
        <NavLink
            to={to}
            className={({ isActive }) => `
                flex items-center
                ${collapsed ? "justify-center" : "gap-3"}
                px-3 py-2 rounded-xl cursor-pointer transition-colors
                ${
                    isActive
                    ? "bg-green-100 text-green-700"
                    : "text-gray-600 hover:bg-gray-100"
                }
            `}
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