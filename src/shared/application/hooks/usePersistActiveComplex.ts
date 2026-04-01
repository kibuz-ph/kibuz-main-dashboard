import { useEffect } from "react";
import { useAppSelector } from "@/shared/application/store/hooks";
import { selectActiveComplex } from "@/domains/residential_complex_domain/application/redux/selectors/residentialComplexSelector";

export const usePersistActiveComplex = () => {
    const activeComplex = useAppSelector(selectActiveComplex);

    useEffect(() => {
        if (typeof window === "undefined") return;

        if (activeComplex) {
            localStorage.setItem("activeComplex", JSON.stringify(activeComplex));
            localStorage.setItem("hasSelectedComplex", "true");
        } else {
            localStorage.removeItem("activeComplex");
            localStorage.removeItem("hasSelectedComplex");
        }
    }, [activeComplex]);
};
