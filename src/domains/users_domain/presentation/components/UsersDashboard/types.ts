export type UserStatus = "Activo" | "Inactivo" | "Pendiente";
export type UserRole = "Propietario" | "Inquilino" | "Residente";

export type UserRow = {
    id: number;
    name: string;
    email: string;
    role: UserRole;
    status: UserStatus;
    joined: string;
    avatar: string;
    document: string;
    phone: string;
    tower: string;
    apartment: string;
};

export type StatItem = {
    label: string;
    value: string;
    sub: string;
    icon: string;
};
