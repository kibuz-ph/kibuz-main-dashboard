import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppSelector } from "@/shared/application/store/hooks";
import { selectActiveComplex } from "@/domains/residential_complex_domain/application/redux/selectors/residentialComplexSelector";
import { selectComplexRoute } from "@/domains/auth_domain/infrastructure/routes";

export const useRequireActiveComplex = () => {
    const activeComplex = useAppSelector(selectActiveComplex);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const hasSelected = typeof window !== "undefined"
            ? localStorage.getItem("hasSelectedComplex") === "true"
            : false;

        if (activeComplex || hasSelected) return;
        if (location.pathname.startsWith(selectComplexRoute)) return;

        navigate(selectComplexRoute, { replace: true });
    }, [activeComplex, location.pathname, navigate]);
};
