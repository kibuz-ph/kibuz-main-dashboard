import { Button } from "@/components/ui/button";

type DataTablePaginationProps = {
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
};

const DataTablePagination = ({ total, page, perPage, totalPages, onPageChange }: DataTablePaginationProps) => {
    const from = total === 0 ? 0 : (page - 1) * perPage + 1;
    const to = Math.min(page * perPage, total);
    const canPrev = page > 1;
    const canNext = page < totalPages;

    return (
        <div className="px-6 py-3 border-t border-slate-50 flex items-center justify-between">
            <p className="text-xs text-slate-400">
                Mostrando {from}-{to} de {total}
            </p>
            <div className="flex gap-1.5">
                <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs border-slate-200 text-slate-500"
                    onClick={() => onPageChange(page - 1)}
                    disabled={!canPrev}
                >
                    Anterior
                </Button>
                <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs border-slate-200 text-slate-500"
                    onClick={() => onPageChange(page + 1)}
                    disabled={!canNext}
                >
                    Siguiente
                </Button>
            </div>
        </div>
    );
};

export default DataTablePagination;
