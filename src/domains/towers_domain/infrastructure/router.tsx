import AdminLayout from "@/shared/presentation/layouts/AdminLayout";
import { PrivateRoute } from "@/shared/presentation/redirect-route";
import TowersPage from "../presentation/pages";
import { towersRoute } from "./routes";

const towersRouter = {
    router: {
        element: <PrivateRoute />,
        children: [
            {
                element: <AdminLayout />,
                path: towersRoute,
                children: [
                    {
                        index: true,
                        element: <TowersPage />,
                    }
                ]
            }
        ]
    }
};

export default towersRouter;