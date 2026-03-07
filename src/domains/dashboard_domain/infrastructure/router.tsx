import AdminLayout from "../../../shared/presentation/layouts/AdminLayout";
import { PrivateRoute } from "../../../shared/presentation/redirect-route";
import DashboardPage from "../presentation/pages";
import { dashboardRoute } from "./routes";

const dashboardRouter = {
    router: {
        element: <PrivateRoute />,
        children: [
            {
                element: <AdminLayout />,
                path: dashboardRoute,
                children: [
                    {
                        index: true,
                        element: <DashboardPage />,
                    }
                ]
            }
        ]
    }
};

export default dashboardRouter;