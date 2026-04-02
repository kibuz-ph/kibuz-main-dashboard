import AdminLayout from "@/shared/presentation/layouts/AdminLayout";
import { PrivateRoute } from "@/shared/presentation/redirect-route";
import UsersPage from "../presentation/pages";
import { usersRoute } from "./routes";

const usersRouter = {
    router: {
        element: <PrivateRoute />,
        children: [
            {
                element: <AdminLayout />,
                path: usersRoute,
                children: [
                    {
                        index: true,
                        element: <UsersPage />,
                    },
                ],
            },
        ],
    },
};

export default usersRouter;
