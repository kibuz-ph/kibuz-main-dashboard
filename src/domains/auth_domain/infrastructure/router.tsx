import AuthLayout from "../../../shared/presentation/layouts/AuthLayout";
import PublicLayout from "../../../shared/presentation/layouts/PublicLayout";
import { UnauthenticatedRoute, PrivateRoute } from "../../../shared/presentation/redirect-route";
import LoginPage from "../presentation/pages/Login";
import SelectCompanyPage from "../presentation/pages/SelectCompany/index.tsx";
import { loginRoute, selectCompanyRoute } from "./routes";

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

const selectCompanyRouter = {
    router: {
        element: <PrivateRoute />,
        children: [
            {
                element: <PublicLayout />,
                path: selectCompanyRoute,
                children: [
                    {
                        index: true,
                        element: <SelectCompanyPage />,
                    }
                ]
            }
        ]
    }
};

export { authRouter as default, selectCompanyRouter };