import { createBrowserRouter } from "react-router-dom";
import authRouter from "../../domains/auth_domain/infrastructure/router";
import dashboardRouter from "../../domains/dashboard_domain/infrastructure/router";

const routes = [
    authRouter?.router,
    dashboardRouter?.router
];

const router = createBrowserRouter(
    routes
);

export default router;