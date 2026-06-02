import AdminLayout from "@/shared/presentation/layouts/AdminLayout";
import { PrivateRoute } from "@/shared/presentation/redirect-route";
import ApartmentsPage from "../presentation/pages";
import { apartmentsRoute } from "./routes";

const apartmentsRouter = {
    router: {
        element: <PrivateRoute />,
        children: [
            {
                element: <AdminLayout />,
                path: apartmentsRoute,
                children: [
                    {
                        index: true,
                        element: <ApartmentsPage />,
                    },
                ],
            },
        ],
    },
};

export default apartmentsRouter;
