import PublicLayout from "@/shared/presentation/layouts/PublicLayout";
import NotFoundPage from "../presentation/pages";
import { notFoundRoute } from "./routes";

const notFoundRouter = {
    router: {
        element: <PublicLayout />,
        path: notFoundRoute,
        children: [
            {
                index: true,
                element: <NotFoundPage />,
            }
        ]
    }
};

export default notFoundRouter;
