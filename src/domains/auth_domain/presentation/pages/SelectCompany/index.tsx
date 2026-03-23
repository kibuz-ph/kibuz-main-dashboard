import { useAppSelector } from "@/shared/application/store/hooks";
import { selectAuthUser } from "@/domains/auth_domain/application/redux/selectors/authSelector";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const SelectCompanyPage = () => {
    const authUser = useAppSelector(selectAuthUser);

    const companies = [
        { 
            name: "faroverde", 
            icon: "ri-emotion-happy-line", 
            path: "/dashboard",
            color: "hover:bg-green-50 border-green-200"
        },
        { 
            name: "marsella", 
            icon: "ri-close-line", 
            path: "/dashboard",
            color: "hover:bg-red-50 border-red-200"
        },
        { 
            name: "florenza", 
            icon: "ri-triangle-line", 
            path: "/dashboard",
            color: "hover:bg-blue-50 border-blue-200"
        },
        { 
            name: "paysandú", 
            icon: "ri-circle-line", 
            path: "/dashboard",
            color: "hover:bg-purple-50 border-purple-200"
        },
    ];

    return (
        <div className="flex flex-col items-center justify-center py-12">
            <div className="text-center mb-12">
                <h1 className="text-4xl font-bold text-slate-900 mb-4">
                    Bienvenido {authUser?.firstName || 'Usuario'}
                </h1>
                <p className="text-lg text-slate-600">
                    Selecciona la empresa a la que quieres acceder
                </p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-12">
                {companies.map((company) => (
                    <Button 
                        asChild 
                        variant="outline" 
                        className={`flex flex-col h-32 w-32 justify-center items-center text-lg font-semibold text-slate-700 transition-all transform hover:scale-105 ${company.color}`}
                        key={company.name}
                    >
                        <Link to={company.path}>
                            <i className={`${company.icon} text-4xl mb-2`}></i>
                            <span className="text-sm">{company.name}</span>
                        </Link>
                    </Button>
                ))}
            </div>

            <div className="text-center">
                <h2 className="text-2xl font-semibold text-slate-700 mb-4">
                    ¿A cuál quieres ingresar?
                </h2>
                <p className="text-sm text-slate-500">
                    Cada empresa tiene su propia configuración y datos
                </p>
            </div>
        </div>
    );
};

export default SelectCompanyPage;
