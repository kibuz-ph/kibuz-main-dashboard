import AdminLayout from "@/shared/presentation/layouts/AdminLayout";
import { PrivateRoute } from "@/shared/presentation/redirect-route";
import SettingsPage from "../presentation/pages";
import { settingsRoute } from "./routes";

const settingsRouter = {
    router: {
        element: <PrivateRoute />,
        children: [
            {
                element: <AdminLayout />,
                path: settingsRoute,
                children: [
                    {
                        index: true,
                        element: <SettingsPage />,
                    },
                ],
            },
        ],
    },
};

export default settingsRouter;
