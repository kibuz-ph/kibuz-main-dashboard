import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authLogin } from "@/domains/auth_domain/infrastructure/api/authApi";
import type { Login, LoginResponse, AuthState } from '@/domains/auth_domain/application/constants/types'

export const initialState: AuthState = {
    isLoading: false,
    token: null,
    isAuthenticated: false,
    authUser: null,
};

export const requestAuthLogin = createAsyncThunk<
    LoginResponse, 
    Login,
    { rejectValue: string }
    >(
    'request/request_auth_login', async (data, {rejectWithValue}) => {
        try {
            const response = await authLogin(data);
            return response;
        } catch (error) {
            return rejectWithValue(
                error instanceof Error ? error.message : "Error en login"
            );
        }
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(requestAuthLogin.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(requestAuthLogin.rejected, (state) => {
                state.isLoading = false;
            })
            .addCase(requestAuthLogin.fulfilled, (state, { payload }) => {
                const { user } = payload;
                state.isLoading = false;
                state.authUser = user;
            })
    }
});

export default authSlice.reducer;