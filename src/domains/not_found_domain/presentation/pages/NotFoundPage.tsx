import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="text-center space-y-8">
            {/* 404 Illustration */}
            <div className="relative">
                <div className="text-9xl font-bold text-slate-200 select-none">
                    404
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-6xl">🔍</div>
                </div>
            </div>

            {/* Error Message */}
            <div className="space-y-4">
                <h1 className="text-4xl font-bold text-slate-900">
                    Página no encontrada
                </h1>
                <p className="text-xl text-slate-600 max-w-md mx-auto">
                    Lo sentimos, la página que estás buscando no existe o ha sido movida.
                </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button asChild className="min-w-[140px]">
                    <Link to="/" className="flex items-center gap-2">
                        <i className="ri-home-4-line h-4 w-4"></i>
                        Ir al inicio
                    </Link>
                </Button>
                
                <Button variant="outline" asChild className="min-w-[140px]">
                    <Link to="javascript:history.back()" className="flex items-center gap-2">
                        <i className="ri-arrow-left-line h-4 w-4"></i>
                        Volver atrás
                    </Link>
                </Button>
            </div>

            {/* Additional Help */}
            <div className="bg-slate-50 rounded-lg p-6 text-left max-w-md mx-auto">
                <h3 className="font-semibold text-slate-900 mb-3 flex items-center gap-2">
                    <i className="ri-search-line h-4 w-4"></i>
                    ¿Qué puedes hacer?
                </h3>
                <ul className="text-sm text-slate-600 space-y-2">
                    <li>• Verifica que la URL esté escrita correctamente</li>
                    <li>• Regresa a la página principal</li>
                    <li>• Contacta al soporte si crees que esto es un error</li>
                </ul>
            </div>
        </div>
    );
};

export default NotFoundPage;
