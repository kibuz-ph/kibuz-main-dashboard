import { Navigate, Outlet, useLocation } from "react-router-dom";
import { loginRoute } from "@/domains/auth_domain/infrastructure/routes";
import { dashboardRoute } from "@/domains/dashboard_domain/infrastructure/routes";
import { useAuth } from "@/domains/auth_domain/application/hooks/useAuth";

export const PrivateRoute = () => {
    const location = useLocation();
    const { data: user, isLoading } = useAuth();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (!user) {
        return <Navigate to={loginRoute} state={{ from: location}} replace />
    }

    return <Outlet />;
}

export const UnauthenticatedRoute = () => {
    const { data: user, isLoading } = useAuth();

    if (isLoading) return null

    if (user) {
        return <Navigate to={dashboardRoute} replace />
    }

    return (
        <Outlet />
    );
}