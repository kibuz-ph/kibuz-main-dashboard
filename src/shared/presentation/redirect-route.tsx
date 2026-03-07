import { Navigate, Outlet, useLocation } from "react-router-dom";
import { loginRoute } from "../../domains/auth_domain/infrastructure/routes";
import { dashboardRoute } from "../../domains/dashboard_domain/infrastructure/routes";

export const PrivateRoute = () => {
    const location = useLocation();
    const token = localStorage.getItem("token");

    if (!token) {
        return <Navigate to={loginRoute} state={{ from: location}} replace />
    }

    return <Outlet />;
}

export const UnauthenticatedRoute = () => {
    const token = localStorage.getItem("token");

    if (token) {
        return <Navigate to={dashboardRoute} /> 
    }

    return (
        <Outlet />
    );
}