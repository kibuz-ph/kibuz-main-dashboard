import type { RootState } from '@/shared/application/store';
import { createSelector } from '@reduxjs/toolkit';

const residentialComplexState = (state: RootState) => state.residentialComplex;

export const selectResidentialComplexes = createSelector(residentialComplexState, (state) => {
    return state?.complexes || []
});

export const selectActiveComplex = createSelector(residentialComplexState, (state) => {
    return state?.activeComplex || null
});
