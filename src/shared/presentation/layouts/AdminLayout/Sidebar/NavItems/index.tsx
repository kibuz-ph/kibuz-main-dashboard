import type { NavItemsProps } from "./types";
import MenuItem from "@/shared/presentation/components/MenuItem";

const NavItems = ({item, collapsed}: NavItemsProps) => {
    return (
        <nav className="flex-1 mt-4 px-2 space-y-1">
            <MenuItem
                icon={item.icon}
                label={item.text}
                to={item.path}
                collapsed={collapsed}
            />
        </nav>
    );
};

export default NavItems;