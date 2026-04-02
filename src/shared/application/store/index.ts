import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from '@/domains/auth_domain/application/redux/slices/authSlice'
import { residentialComplexSlice } from '@/domains/residential_complex_domain/application/redux/slices/residentialComplexSlice'
import { usersSlice } from '@/domains/users_domain/application/redux/slices/usersSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        residentialComplex: residentialComplexSlice.reducer,
        users: usersSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
