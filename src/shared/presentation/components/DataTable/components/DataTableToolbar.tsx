import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import type { DataTableFilter, DataTableSearch } from "../types";

type DataTableToolbarProps<TData> = {
    search?: DataTableSearch<TData>;
    filters?: Array<DataTableFilter<TData>>;
    searchValue: string;
    onSearchChange: (value: string) => void;
    filterValues: Record<string, string>;
    onFilterChange: (key: string, value: string) => void;
};

const DataTableToolbar = <TData,>({
    search,
    filters,
    searchValue,
    onSearchChange,
    filterValues,
    onFilterChange,
}: DataTableToolbarProps<TData>) => {
    if (!search && (!filters || filters.length === 0)) return null;

    return (
        <div className="flex flex-col sm:flex-row gap-3">
            {search ? (
                <div className="relative flex-1">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm">o</span>
                    <Input
                        placeholder={search.placeholder ?? "Buscar..."}
                        value={searchValue}
                        onChange={(event) => onSearchChange(event.target.value)}
                        className="pl-9 bg-slate-50 border-slate-200 text-sm focus:bg-white transition-colors"
                    />
                </div>
            ) : null}
            {filters?.map((filter) => {
                const key = String(filter.key);
                return (
                    <Select
                        key={key}
                        value={filterValues[key] ?? "all"}
                        onValueChange={(value) => onFilterChange(key, value)}
                    >
                        <SelectTrigger className="w-full sm:w-40 bg-slate-50 border-slate-200 text-sm">
                            <SelectValue placeholder={filter.label} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">Todos</SelectItem>
                            {filter.options.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                );
            })}
        </div>
    );
};

export default DataTableToolbar;
