import AuthLayout from "../../../shared/presentation/layouts/AuthLayout";
import { UnauthenticatedRoute } from "../../../shared/presentation/redirect-route";
import LoginPage from "../presentation/pages/Login";
import { loginRoute } from "./routes";

const authRouter = {
    router: {
        element: <UnauthenticatedRoute />,
        children: [
            {
                element: <AuthLayout />,
                path: loginRoute,
                children: [
                    {
                        index: true,
                        element: <LoginPage />,
                    }
                ]
            }
        ]
    }
};

export default authRouter;