import type { Role } from "@/shared/application/constants/types/auth";
import type { SidebarItem } from "@/shared/application/constants/types/sidebar";
import { dashboardRoute } from "@/domains/dashboard_domain/infrastructure/routes";
import { NAME_MODULE, NAME_ROLE } from "@/shared/application/constants/appData";
import { ICON_MODULE } from "@/shared/application/constants/icons";
import { towersRoute } from "@/domains/towers_domain/infrastructure/routes";
import { residentialComplexRoute } from "@/domains/residential_complex_domain/infrastructure/routes";

export const SIDE_BAR_ITEMS = (role: Role): SidebarItem[] => {
    const itemsArray: SidebarItem[] = [
        {
            icon: ICON_MODULE.DASHBOARD_MODULE,
            text: NAME_MODULE.DASHBOARD,
            path: dashboardRoute,
            role: [NAME_ROLE.ADMIN_ROLE]
        },
        {
            icon: ICON_MODULE.RESIDENTIAL_COMPLEXES_MODULE,
            text: NAME_MODULE.RESIDENTIAL_COMPLEXES,
            path: residentialComplexRoute,
            role: [NAME_ROLE.ADMIN_ROLE]
        },
        {
            icon: ICON_MODULE.TOWERS_MODULE,
            text: NAME_MODULE.TOWERS,
            path: towersRoute,
            role: [NAME_ROLE.ADMIN_ROLE]
        },
    ];

    return itemsArray.filter((item) => {
        return item.role.includes(role);
    });
}