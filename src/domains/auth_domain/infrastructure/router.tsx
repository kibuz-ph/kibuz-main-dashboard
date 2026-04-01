import AuthLayout from "../../../shared/presentation/layouts/AuthLayout";
import PublicLayout from "../../../shared/presentation/layouts/PublicLayout";
import { UnauthenticatedRoute, PrivateRoute } from "../../../shared/presentation/redirect-route";
import LoginPage from "../presentation/pages/Login";
import SelectCompanyPage from "../presentation/pages/SelectComplex/index.tsx";
import { loginRoute, selectComplexRoute } from "./routes";

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

const selectComplexRouter = {
    router: {
        element: <PrivateRoute />,
        children: [
            {
                element: <PublicLayout />,
                path: selectComplexRoute,
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

export { authRouter as default, selectComplexRouter };