import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useMyResidentialComplexes } from "@/domains/residential_complex_domain/application/hooks/useResidentialComplexes";
import { useAppDispatch, useAppSelector } from "@/shared/application/store/hooks";
import {
    selectActiveComplex,
    selectResidentialComplexes,
} from "@/domains/residential_complex_domain/application/redux/selectors/residentialComplexSelector";
import { setActiveComplex, setComplexes } from "@/domains/residential_complex_domain/application/redux/slices/residentialComplexSlice";

export const useSyncActiveComplexFromUrl = () => {
    const { complexSlug } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
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
        if (list.length === 0) return;

        if (complexesResponse?.data && complexes.length === 0) {
            dispatch(setComplexes(complexesResponse.data));
        }

        const slugMatch = list.find((complex) => complex.slug === complexSlug);

        if (slugMatch) {
            if (slugMatch.id !== activeComplex?.id || slugMatch.slug !== activeComplex?.slug) {
                dispatch(setActiveComplex(slugMatch));
            }
            return;
        }

        const idMatch = activeComplex?.id
            ? list.find((complex) => complex.id === activeComplex.id)
            : undefined;

        if (idMatch) {
            dispatch(setActiveComplex(idMatch));

            if (idMatch.slug && idMatch.slug !== complexSlug) {
                navigate(location.pathname.replace(`/${complexSlug}`, `/${idMatch.slug}`), { replace: true });
            }
        }
    }, [complexSlug, complexesResponse, complexes, activeComplex, dispatch, location.pathname, navigate]);
};
