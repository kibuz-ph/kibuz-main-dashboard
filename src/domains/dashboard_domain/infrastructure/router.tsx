import { Navigate } from "react-router-dom";
import AdminLayout from "../../../shared/presentation/layouts/AdminLayout";
import { PrivateRoute } from "../../../shared/presentation/redirect-route";
import DashboardPage from "../presentation/pages";
import { dashboardRoute } from "./routes";

const dashboardRouter = {
    router: {
        element: <PrivateRoute />,
        children: [
            {
                index: true,
                element: <Navigate to={dashboardRoute} replace />,
            },
            {
                element: <AdminLayout />,
                children: [
                    {
                        path: dashboardRoute,
                        element: <DashboardPage />,
                    }
                ]
            }
        ]
    }
};

export default dashboardRouter;