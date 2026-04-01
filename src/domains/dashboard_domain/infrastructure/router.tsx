import AdminLayout from "../../../shared/presentation/layouts/AdminLayout";
import { PrivateRoute, ComplexIndexRedirect } from "../../../shared/presentation/redirect-route";
import DashboardPage from "../presentation/pages";
import { dashboardRoute } from "./routes";

const dashboardRouter = {
    router: {
        element: <PrivateRoute />,
        children: [
            {
                index: true,
                element: <ComplexIndexRedirect />,
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
