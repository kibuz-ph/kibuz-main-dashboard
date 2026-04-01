import { generatePath, Navigate, Outlet, useLocation } from "react-router-dom";
import { loginRoute, selectComplexRoute } from "@/domains/auth_domain/infrastructure/routes";
import { dashboardRoute } from "@/domains/dashboard_domain/infrastructure/routes";
import { useAuth } from "@/domains/auth_domain/application/hooks/useAuth";
import { usePostLoginRedirect } from "@/domains/auth_domain/application/hooks/usePostLoginRedirect";
import { useAppSelector } from "@/shared/application/store/hooks";
import { selectActiveComplex } from "@/domains/residential_complex_domain/application/redux/selectors/residentialComplexSelector";

export const PrivateRoute = () => {
    const location = useLocation();
    const { data: user, isLoading } = useAuth();

    if (isLoading) {
        return null;
    }

    if (!user) {
        return <Navigate to={loginRoute} state={{ from: location}} replace />
    }

    return <Outlet />;
}

export const UnauthenticatedRoute = () => {
    const location = useLocation();
    const { data: user, isLoading } = useAuth();
    const activeComplex = useAppSelector(selectActiveComplex);
    const from = location.state?.from?.pathname || dashboardRoute;
    const { redirectTo, isReady } = usePostLoginRedirect(user, from, activeComplex);

    if (isLoading) return null

    if (user) {
        if (!isReady || !redirectTo) return null;
        return <Navigate to={redirectTo} replace />
    }

    return (
        <Outlet />
    );
}

export const ComplexIndexRedirect = () => {
    const activeComplex = useAppSelector(selectActiveComplex);

    if (!activeComplex) {
        return <Navigate to={selectComplexRoute} replace />
    }

    return (
        <Navigate
            to={generatePath(dashboardRoute, { complexSlug: activeComplex.slug })}
            replace
        />
    );
};
