import { Outlet } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const PublicLayout = () => {
    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 to-slate-100 flex flex-col">
            {/* Header simple */}
            <header className="bg-white shadow-sm border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        <div className="flex items-center gap-3">
                            <Link to="/" className="flex items-center gap-2">
                                <img
                                    src="/src/assets/logo-svg-original.svg"
                                    alt="Kibuz"
                                    className="h-8 w-auto object-contain"
                                />
                            </Link>
                        </div>
                        
                        <div className="flex items-center gap-4">
                            <Button variant="ghost" size="sm" asChild>
                                <Link to="/" className="flex items-center gap-2">
                                    <i className="ri-home-4-line h-4 w-4"></i>
                                    Inicio
                                </Link>
                            </Button>
                        </div>
                    </div>
                </div>
            </header>

            {/* Main content */}
            <main className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-2xl">
                    <Outlet />
                </div>
            </main>

            {/* Footer simple */}
            <footer className="bg-white border-t border-slate-200 py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center text-sm text-slate-600">
                        <p>&copy; 2025 Kibuz. Todos los derechos reservados.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PublicLayout;
