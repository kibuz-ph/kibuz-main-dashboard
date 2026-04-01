import { useEffect, useMemo } from "react";
import { generatePath } from "react-router-dom";
import { useMyResidentialComplexes } from "@/domains/residential_complex_domain/application/hooks/useResidentialComplexes";
import { useAppDispatch } from "@/shared/application/store/hooks";
import { setActiveComplex, setComplexes } from "@/domains/residential_complex_domain/application/redux/slices/residentialComplexSlice";
import { selectComplexRoute } from "@/domains/auth_domain/infrastructure/routes";
import { dashboardRoute } from "@/domains/dashboard_domain/infrastructure/routes";
import type { ResidentialComplex } from "@/domains/residential_complex_domain/application/constants/types";

type UsePostLoginRedirectResult = {
    redirectTo: string | null;
    isReady: boolean;
};

export const usePostLoginRedirect = (
    user: unknown,
    from?: string,
    activeComplex?: ResidentialComplex | null
): UsePostLoginRedirectResult => {
    const dispatch = useAppDispatch();
    const {
        data: complexesResponse,
        isLoading,
        isError,
    } = useMyResidentialComplexes(!!user);

    useEffect(() => {
        if (!user || !complexesResponse?.data) return;

        dispatch(setComplexes(complexesResponse.data));

        if (complexesResponse.data.length === 1) {
            dispatch(setActiveComplex(complexesResponse.data[0]));
        }
    }, [user, complexesResponse, dispatch]);

    const redirectTo = useMemo(() => {
        if (!user) return null;

        if (isError) return from || selectComplexRoute;

        if (activeComplex?.slug) {
            return generatePath(dashboardRoute, {
                complexSlug: activeComplex.slug,
            });
        }

        const complexes = complexesResponse?.data;
        if (!complexes) return null;

        if (complexes.length > 1) return selectComplexRoute;
        if (complexes.length === 0) return selectComplexRoute;

        const complex = complexes[0];
        const fallback = generatePath(dashboardRoute, {
            complexSlug: complex.slug,
        });

        if (!from || from === "/") return fallback;
        if (from.startsWith(`/${complex.slug}/`)) return from;
        if (from.startsWith("/")) return `/${complex.slug}${from}`;

        return `/${complex.slug}/${from}`;
    }, [user, complexesResponse, from, isError, activeComplex]);

    const isReady = !!user && (!!complexesResponse?.data || isError) && !isLoading;

    return { redirectTo, isReady };
};
