import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ResidentialComplex } from "../../constants/types";

type State = {
    complexes: ResidentialComplex[];
    activeComplex: ResidentialComplex | null;
};

const loadActiveComplex = (): ResidentialComplex | null => {
    if (typeof window === "undefined") return null;

    try {
        const hasSelected = localStorage.getItem("hasSelectedComplex") === "true";
        if (!hasSelected) return null;

        const raw = localStorage.getItem("activeComplex");
        return raw ? (JSON.parse(raw) as ResidentialComplex) : null;
    } catch {
        return null;
    }
};

const initialState: State = {
    complexes: [],
    activeComplex: loadActiveComplex(),
};

export const residentialComplexSlice = createSlice({
    name: "residentialComplex",
    initialState,
    reducers: {
        setComplexes: (state, action: PayloadAction<ResidentialComplex[]>) => {
            state.complexes = action.payload;
        },
        setActiveComplex: (state, action: PayloadAction<ResidentialComplex>) => {
            state.activeComplex = action.payload;
        },
    },
});

export const { setComplexes, setActiveComplex } = residentialComplexSlice.actions;
export default residentialComplexSlice.reducer;
