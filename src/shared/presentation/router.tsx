import { createBrowserRouter } from "react-router-dom";
import authRouter, { selectComplexRouter } from "@/domains/auth_domain/infrastructure/router";
import dashboardRouter from "@/domains/dashboard_domain/infrastructure/router";
import towersRouter from "@/domains/towers_domain/infrastructure/router";
import apartmentsRouter from "@/domains/apartments_domain/infrastructure/router";
import settingsRouter from "@/domains/settings_domain/infrastructure/router";
import commonAreasRouter from "@/domains/common_areas_domain/infrastructure/router";
import residentialComplexRouter from "@/domains/residential_complex_domain/infrastructure/router";
import usersRouter from "@/domains/users_domain/infrastructure/router";
import notFoundRouter from "@/domains/not_found_domain/infrastructure/router";
import { notFoundRoute } from "@/domains/not_found_domain/infrastructure/routes";

const routes = [
    authRouter?.router,
    selectComplexRouter?.router,
    dashboardRouter?.router,
    residentialComplexRouter?.router,
    towersRouter?.router,
    apartmentsRouter?.router,
    settingsRouter?.router,
    commonAreasRouter?.router,
    usersRouter?.router,
    notFoundRouter?.router,
    {
        path: "*",
        element: <div>{/* Redirect to 404 page */}</div>,
        loader: () => {
            window.location.href = notFoundRoute;
            return null;
        }
    }
];

const router = createBrowserRouter(
    routes
);

export default router;
