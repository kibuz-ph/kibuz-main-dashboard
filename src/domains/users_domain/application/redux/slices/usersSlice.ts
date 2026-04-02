import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { User } from "../../constants/types";

type State = {
    users: User[];
    activeUser: User | null;
};

const initialState: State = {
    users: [],
    activeUser: null,
};

export const usersSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setUsers: (state, action: PayloadAction<User[]>) => {
            state.users = action.payload;
        },
        setActiveUser: (state, action: PayloadAction<User>) => {
            state.activeUser = action.payload;
        },
    },
});

export const { setUsers, setActiveUser } = usersSlice.actions;
export default usersSlice.reducer;
