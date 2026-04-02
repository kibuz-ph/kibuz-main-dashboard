import { API_ROUTES } from "./routesApi";
import type { User } from "../../application/constants/types";
import { apiHandler } from "@/shared/infrastructure/api/apiHandler";

// GET all users
export const getUsers = () => {
    return apiHandler<User[]>(API_ROUTES.USERS);
};
