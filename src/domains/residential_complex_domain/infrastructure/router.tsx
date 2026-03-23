import AdminLayout from "@/shared/presentation/layouts/AdminLayout";
import { PrivateRoute } from "@/shared/presentation/redirect-route";
import CommonAreasPage from "../presentation/pages";
import { residentialComplexRoute } from "./routes";

const residentialComplexRouter = {
    router: {
        element: <PrivateRoute />,
        children: [
            {
                element: <AdminLayout />,
                path: residentialComplexRoute,
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

export default residentialComplexRouter;