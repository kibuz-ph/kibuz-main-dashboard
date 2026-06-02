import { useMemo } from "react";
import type { User, UsersPaginatedResponse, UserRow } from "@/domains/users_domain/application/constants/types";

type UseUserRowsResult = {
    rows: UserRow[];
    total: number;
    totalPages: number;
};

const mapUserRows = (source: UsersPaginatedResponse | User[] | undefined): UseUserRowsResult => {
    const rawUsers = Array.isArray(source) ? source : source?.data ?? [];

    const rows = rawUsers.map((user, index) => {
        const detail = (user.userDetail ?? (user as { user_detail?: unknown }).user_detail ?? {}) as unknown as Record<string, unknown>;
        const first = (detail.firstName ?? detail.first_name ?? "") as string;
        const last = (detail.lastName ?? detail.first_lastname ?? detail.last_name ?? "") as string;
        const name = `${first} ${last}`.trim() || user.username || `Usuario ${index + 1}`;
        const isActive = (user.isActive ?? (user as { is_active?: boolean }).is_active ?? true) as boolean;

        return {
            name,
            email: user.email,
            status: isActive ? "Activo" : "Inactivo",
            avatar: `https://i.pravatar.cc/40?img=${(index % 70) + 1}`,
            userDetail: {
                firstName: first,
                lastName: last,
                document: (detail.document ?? "N/A") as string,
                phone: (detail.phone ?? "N/A") as string,
            },
        };
    });

    return {
        rows,
        total: Array.isArray(source) ? rows.length : source?.total ?? source?.meta?.total ?? rows.length,
        totalPages: Array.isArray(source) ? 1 : source?.totalPages ?? source?.meta?.totalPages ?? 1,
    };
};

export const useUserRows = (source: UsersPaginatedResponse | User[] | undefined): UseUserRowsResult => {
    return useMemo(() => mapUserRows(source), [source]);
};
