import type { RootState } from "@/shared/application/store";
import { createSelector } from "@reduxjs/toolkit";

const usersState = (state: RootState) => state.users;

export const selectUsers = createSelector(usersState, (state) => {
    return state?.users || [];
});

export const selectActiveUser = createSelector(usersState, (state) => {
    return state?.activeUser || null;
});
