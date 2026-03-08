import { createBrowserRouter } from "react-router-dom";
import authRouter from "@/domains/auth_domain/infrastructure/router";
import dashboardRouter from "@/domains/dashboard_domain/infrastructure/router";
import towersRouter from "@/domains/towers_domain/infrastructure/router";

const routes = [
    authRouter?.router,
    dashboardRouter?.router,
    towersRouter?.router
];

const router = createBrowserRouter(
    routes
);

export default router;