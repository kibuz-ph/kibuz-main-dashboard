import type { RootState } from '@/shared/application/store';
import { createSelector } from '@reduxjs/toolkit';

const authState = (state: RootState) => state.auth;

export const selectAuthUser = createSelector(authState, (state) => {
    return state?.authUser
});