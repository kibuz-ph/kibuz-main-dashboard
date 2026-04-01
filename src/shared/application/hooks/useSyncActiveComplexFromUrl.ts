import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useMyResidentialComplexes } from "@/domains/residential_complex_domain/application/hooks/useResidentialComplexes";
import { useAppDispatch, useAppSelector } from "@/shared/application/store/hooks";
import {
    selectActiveComplex,
    selectResidentialComplexes,
} from "@/domains/residential_complex_domain/application/redux/selectors/residentialComplexSelector";
import { setActiveComplex, setComplexes } from "@/domains/residential_complex_domain/application/redux/slices/residentialComplexSlice";

export const useSyncActiveComplexFromUrl = () => {
    const { complexSlug } = useParams();
    const dispatch = useAppDispatch();
    const activeComplex = useAppSelector(selectActiveComplex);
    const complexes = useAppSelector(selectResidentialComplexes);

    const shouldFetch = !!complexSlug && complexes.length === 0;
    const { data: complexesResponse } = useMyResidentialComplexes(shouldFetch);

    useEffect(() => {
        if (!complexSlug) return;
        const hasSelected = typeof window !== "undefined"
            ? localStorage.getItem("hasSelectedComplex") === "true"
            : false;

        if (!hasSelected) return;

        const list = complexesResponse?.data ?? complexes;
        const match = list.find((complex) => complex.slug === complexSlug);

        if (complexesResponse?.data && complexes.length === 0) {
            dispatch(setComplexes(complexesResponse.data));
        }

        if (match && match.id !== activeComplex?.id) {
            dispatch(setActiveComplex(match));
        }
    }, [complexSlug, complexesResponse, complexes, activeComplex, dispatch]);
};
