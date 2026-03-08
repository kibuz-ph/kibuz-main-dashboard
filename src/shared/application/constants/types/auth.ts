import type { NAME_ROLE } from "@/shared/application/constants/appData";

export type Role = typeof NAME_ROLE[keyof typeof NAME_ROLE];