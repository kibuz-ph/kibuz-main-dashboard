export interface Login {
    email: string;
    password: string;
}

export interface LoginResponse {
    success: boolean;
    token: string;
    user: {
        id: string;
        email: string;
        username: string;
        firstName: string;
        lastName: string;
        role: string;
        isActive: boolean;
        birthday: string;
        document: string;
        phone: string;
        secondName: string;
        secondLastName: string;
    };
}

export interface AuthState {
    isLoading: boolean;
    token: string | null;
    isAuthenticated: boolean;
    authUser: LoginResponse["user"] | null;
}