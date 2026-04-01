import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from '@/domains/auth_domain/application/redux/slices/authSlice'
import { residentialComplexSlice } from '@/domains/residential_complex_domain/application/redux/slices/residentialComplexSlice'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        residentialComplex: residentialComplexSlice.reducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;