export interface UserDetail {
    id: string;
    document: string;
    firstName: string;
    secondName: string;
    lastName: string;
    secondLastName: string;
    birthday: string;
    phone: string;
    userId: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    isActive: boolean;
    userDetail: UserDetail;
}

export interface UsersResponse {
    message: string;
    success: boolean;
    data: User[];
}

export type PaginationMeta = {
    page: number;
    perPage: number;
    total: number;
    totalPages?: number;
};

export interface UsersPaginatedResponse {
    data: User[];
    page?: number;
    perPage?: number;
    total?: number;
    totalPages?: number;
    meta?: PaginationMeta;
}

export type UserRow = {
    id: string;
    name: string;
    email: string;
    username: string;
    status: string;
    isActive: boolean;
    avatar: string;
    userDetail: {
        firstName: string;
        secondName: string;
        lastName: string;
        secondLastName: string;
        document: string;
        phone: string;
        birthday: string;
    };
};

export interface CreateUserPayload {
    document: string;
    firstName: string;
    secondName?: string;
    lastName: string;
    secondLastName?: string;
    username: string;
    birthday: string;
    email: string;
    phone: string;
    password: string;
}

export type UpdateUserPayload = Partial<Omit<CreateUserPayload, "password">> & {
    password?: string;
    isActive?: boolean;
};
