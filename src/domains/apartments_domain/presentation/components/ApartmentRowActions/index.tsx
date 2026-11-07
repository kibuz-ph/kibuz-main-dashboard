import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type ApartmentRowActionsProps = {
    onEdit: () => void;
    onDelete: () => void;
};

const ApartmentRowActions = ({ onEdit, onDelete }: ApartmentRowActionsProps) => {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-slate-400 hover:text-slate-700 hover:bg-slate-100"
                >
                    <span className="text-base leading-none">...</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-44 text-sm">
                <DropdownMenuItem className="cursor-pointer" onClick={onEdit}>
                    Editar apartamento
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                    className="cursor-pointer text-red-500 focus:text-red-500 focus:bg-red-50"
                    onClick={onDelete}
                >
                    Eliminar
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};

export default ApartmentRowActions;
