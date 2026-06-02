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
    name: string;
    email: string;
    status: string;
    avatar: string;
    userDetail: {
        firstName: string;
        lastName: string;
        document: string;
        phone: string;
    };
};
