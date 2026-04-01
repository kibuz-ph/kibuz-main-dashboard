import type { Role } from "@/shared/application/constants/types/auth";
import type { SidebarItem } from "@/shared/application/constants/types/sidebar";
import { generatePath } from "react-router-dom";
import { dashboardRoute } from "@/domains/dashboard_domain/infrastructure/routes";
import { NAME_MODULE, NAME_ROLE } from "@/shared/application/constants/appData";
import { ICON_MODULE } from "@/shared/application/constants/icons";
import { towersRoute } from "@/domains/towers_domain/infrastructure/routes";
import { residentialComplexRoute } from "@/domains/residential_complex_domain/infrastructure/routes";
import { selectComplexRoute } from "@/domains/auth_domain/infrastructure/routes";

export const SIDE_BAR_ITEMS = (role: Role, complexSlug?: string): SidebarItem[] => {
    const withSlug = (route: string) => {
        if (!complexSlug) return selectComplexRoute;
        return generatePath(route, { complexSlug });
    };

    const itemsArray: SidebarItem[] = [
        {
            icon: ICON_MODULE.DASHBOARD_MODULE,
            text: NAME_MODULE.DASHBOARD,
            path: withSlug(dashboardRoute),
            role: [NAME_ROLE.MASTER, NAME_ROLE.ADMIN]
        },
        {
            icon: ICON_MODULE.RESIDENTIAL_COMPLEXES_MODULE,
            text: NAME_MODULE.RESIDENTIAL_COMPLEXES,
            path: withSlug(residentialComplexRoute),
            role: [NAME_ROLE.MASTER, NAME_ROLE.ADMIN]
        },
        {
            icon: ICON_MODULE.TOWERS_MODULE,
            text: NAME_MODULE.TOWERS,
            path: withSlug(towersRoute),
            role: [NAME_ROLE.MASTER, NAME_ROLE.ADMIN]
        },
        {
            icon: ICON_MODULE.TOWERS_MODULE,
            text: NAME_MODULE.TOWERS,
            path: withSlug(towersRoute),
            role: [NAME_ROLE.MASTER, NAME_ROLE.ADMIN]
        },
    ];

    return itemsArray.filter((item) => {
        return item.role.includes(role);
    });
}
