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
