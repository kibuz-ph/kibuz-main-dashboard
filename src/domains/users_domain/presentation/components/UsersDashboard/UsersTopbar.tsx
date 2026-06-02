import { Button } from "@/components/ui/button";

const UsersTopbar = () => {
    return (
        <header className="bg-white border-b border-slate-100 px-4 sm:px-8 py-4 flex items-center justify-between sticky top-0 z-10">
            <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-slate-900 flex items-center justify-center">
                    <span className="text-white text-xs font-bold tracking-tight">U</span>
                </div>
                <span className="font-semibold text-slate-800 tracking-tight text-sm hidden sm:block">
                    UserPanel
                </span>
            </div>
            <div className="flex items-center gap-2">
                <Button
                    size="sm"
                    variant="outline"
                    className="text-xs hidden sm:flex gap-1.5 border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                    <span>v</span> Exportar
                </Button>
                <Button size="sm" className="text-xs bg-slate-900 hover:bg-slate-800 text-white gap-1.5">
                    <span>+</span> Nuevo usuario
                </Button>
            </div>
        </header>
    );
};

export default UsersTopbar;
