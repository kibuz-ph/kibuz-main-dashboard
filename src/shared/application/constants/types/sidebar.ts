import type { Role } from "@/shared/application/constants/types/auth";

export type SidebarItem = {
    icon: string;
    text: string;
    path?: string;
    role: Role[];
    children?: SidebarItem[];
};