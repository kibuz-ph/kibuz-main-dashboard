import type { StatItem, UserRole, UserRow, UserStatus } from "./types";

const FIRST_NAMES = [
    "Valentina",
    "Camilo",
    "Daniela",
    "Sebastian",
    "Laura",
    "Andres",
    "Isabella",
    "Felipe",
    "Sofia",
    "Juan",
    "Juliana",
    "Mateo",
    "Mariana",
    "Nicolas",
    "Paula",
    "David",
    "Sara",
    "Miguel",
    "Valeria",
    "Carlos",
];

const LAST_NAMES = [
    "Torres",
    "Rios",
    "Mejia",
    "Gomez",
    "Castillo",
    "Munoz",
    "Ramirez",
    "Herrera",
    "Lopez",
    "Perez",
    "Moreno",
    "Vargas",
    "Silva",
    "Cortes",
    "Suarez",
    "Navarro",
    "Ortega",
    "Diaz",
    "Rojas",
    "Vega",
];

const ROLES: UserRole[] = ["Propietario", "Inquilino", "Residente"];
const STATUSES: UserStatus[] = ["Activo", "Inactivo", "Pendiente"];

const MONTHS = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

const formatJoined = (index: number) => {
    const day = (index % 28) + 1;
    const month = MONTHS[index % MONTHS.length];
    return `${day} ${month} 2024`;
};

const formatPhone = (index: number) => {
    const base = 3001000000 + index * 37;
    return base.toString();
};

const formatDocument = (index: number) => {
    const base = 10000000 + index * 913;
    return base.toString();
};

const formatEmail = (first: string, last: string, index: number) => {
    return `${first.toLowerCase()}.${last.toLowerCase()}${index}@kibuz.co`;
};

const getName = (index: number) => {
    const first = FIRST_NAMES[index % FIRST_NAMES.length];
    const last = LAST_NAMES[Math.floor(index / FIRST_NAMES.length) % LAST_NAMES.length];
    return { first, last, name: `${first} ${last}` };
};

const getTower = (index: number) => {
    const tower = (index % 5) + 1;
    return `Torre ${tower}`;
};

const getApartment = (index: number) => {
    const floor = Math.floor(index / 5) + 1;
    const unit = (index % 5) + 1;
    return `Apto ${floor}${unit.toString().padStart(2, "0")}`;
};

export const USERS: UserRow[] = Array.from({ length: 50 }, (_, idx) => {
    const id = idx + 1;
    const { first, last, name } = getName(idx);
    return {
        id,
        name,
        email: formatEmail(first, last, id),
        role: ROLES[idx % ROLES.length],
        status: STATUSES[idx % STATUSES.length],
        joined: formatJoined(idx),
        avatar: `https://i.pravatar.cc/40?img=${(idx % 70) + 1}`,
        document: formatDocument(id),
        phone: formatPhone(id),
        tower: getTower(idx),
        apartment: getApartment(idx),
    };
});

export const STATUS_STYLES: Record<UserStatus, string> = {
    Activo: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Inactivo: "bg-slate-100 text-slate-500 border-slate-200",
    Pendiente: "bg-amber-50 text-amber-700 border-amber-200",
};

export const STATUS_DOT: Record<UserStatus, string> = {
    Activo: "bg-emerald-500",
    Inactivo: "bg-slate-400",
    Pendiente: "bg-amber-400",
};

export const ROLE_STYLES: Record<UserRole, string> = {
    Propietario: "bg-violet-50 text-violet-700 border-violet-200",
    Inquilino: "bg-blue-50 text-blue-700 border-blue-200",
    Residente: "bg-slate-50 text-slate-600 border-slate-200",
};

export const STATS: StatItem[] = [
    { label: "Total Usuarios", value: "50", sub: "+6 este mes", icon: "US" },
    { label: "Activos", value: "34", sub: "68% del total", icon: "OK" },
    { label: "Propietarios", value: "17", sub: "Titulares", icon: "PRO" },
    { label: "Pendientes", value: "8", sub: "Requiere accion", icon: "PEN" },
];
