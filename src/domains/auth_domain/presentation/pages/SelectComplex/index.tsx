import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/shared/application/store/hooks";
// import { selectAuthUser } from "@/domains/auth_domain/application/redux/selectors/authSelector";
// import { Button } from "@/components/ui/button";
import { generatePath, Link } from "react-router-dom";
import { selectResidentialComplexes } from "@/domains/residential_complex_domain/application/redux/selectors/residentialComplexSelector";
import { setActiveComplex, setComplexes } from "@/domains/residential_complex_domain/application/redux/slices/residentialComplexSlice";
import { dashboardRoute } from "@/domains/dashboard_domain/infrastructure/routes";
import { useAuth } from "@/domains/auth_domain/application/hooks/useAuth";
import { useMyResidentialComplexes } from "@/domains/residential_complex_domain/application/hooks/useResidentialComplexes";
import { withAlpha } from "@/shared/application/utils/commonCunctions";

const SelectComplexPage = () => {
    // const authUser = useAppSelector(selectAuthUser);
    const complexes = useAppSelector(selectResidentialComplexes);
    const { data: user } = useAuth();
    const dispatch = useAppDispatch();
    const shouldFetch = complexes.length === 0 && !!user;
    const { data: complexesResponse } = useMyResidentialComplexes(shouldFetch);

    useEffect(() => {
        if (!complexesResponse?.data || complexes.length > 0) return;
        dispatch(setComplexes(complexesResponse.data));
    }, [complexesResponse, complexes.length, dispatch]);

    return (
        <div className="flex w-full flex-col items-center justify-center py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-brand-title mb-4">
                    Bienvenido {user?.userDetail?.firstName ? `${user?.userDetail?.firstName} 👋` : 'Usuario'} 
                </h1>
                <p className="text-lg text-brand-title">
                    Selecciona la unidad a la que quieres acceder
                </p>
            </div>

            <div className="flex w-full flex-wrap justify-center gap-6 mb-12">
                {complexes.map((complex) => (
                    <Link
                        key={complex.id}
                        className="flex"
                        to={generatePath(dashboardRoute, { complexSlug: complex.slug })}
                        onClick={() => dispatch(setActiveComplex(complex))}
                    >
                        <div 
                            className="flex h-42 w-42 max-w-full flex-col items-center justify-center gap-2 rounded-xl border p-4 text-lg font-semibold text-slate-700 transition-all transform hover:scale-105"
                            style={{
                                borderColor: complex.primaryColor || "var(--brand-primary)",
                                backgroundColor: withAlpha(complex.primaryColor) || "var(--brand-accent-100)",
                            }}
                            key={complex.id}
                        >
                            
                                <img src={complex.logo} alt={complex.name} className="w-26 h-26 object-contain" />
                                <span className="text-sm text-center text-brand-title">{complex.name}</span>
                            
                        </div>
                    </Link>
                ))}
            </div>

            <div className="text-center">
                <h2 className="text-2xl font-semibold text-brand-title mb-4">
                    ¿A cuál quieres ingresar?
                </h2>
                <p className="text-sm text-brand-title">
                    Cada unidad tiene su propia configuración y datos
                </p>
            </div>
        </div>
    );
};

export default SelectComplexPage;
