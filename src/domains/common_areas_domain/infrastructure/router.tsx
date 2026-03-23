import AdminLayout from "@/shared/presentation/layouts/AdminLayout";
import { PrivateRoute } from "@/shared/presentation/redirect-route";
import CommonAreasPage from "../presentation/pages";
import { commonAreasRoute } from "./routes";

const commonAreasRouter = {
    router: {
        element: <PrivateRoute />,
        children: [
            {
                element: <AdminLayout />,
                path: commonAreasRoute,
                children: [
                    {
                        index: true,
                        element: <CommonAreasPage />,
                    }
                ]
            }
        ]
    }
};

export default commonAreasRouter;