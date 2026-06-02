import { useMemo, useState } from "react";
import {
    getCoreRowModel,
    getSortedRowModel,
    type SortingState,
    useReactTable,
} from "@tanstack/react-table";
import DataTableToolbar from "./components/DataTableToolbar";
import DataTablePagination from "./components/DataTablePagination";
import DataTableTable from "./components/DataTableTable";
import type { DataTableProps } from "./types";

const DataTable = <TData,>({
    data,
    columns,
    emptyMessage = "Sin resultados",
    total,
    page,
    perPage,
    totalPages,
    onPageChange,
    search,
    filters,
}: DataTableProps<TData>) => {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [searchValue, setSearchValue] = useState("");
    const [filterValues, setFilterValues] = useState<Record<string, string>>({});

    const filteredData = useMemo(() => {
        let result = data;

        if (search && searchValue.trim().length > 0) {
            const query = searchValue.toLowerCase();
            result = result.filter((row) =>
                search.keys.some((key) =>
                    String((row as Record<string, unknown>)[String(key)] ?? "")
                        .toLowerCase()
                        .includes(query)
                )
            );
        }

        if (filters && filters.length > 0) {
            filters.forEach((filter) => {
                const key = String(filter.key);
                const value = filterValues[key];
                if (!value || value === "all") return;
                result = result.filter((row) => String((row as Record<string, unknown>)[String(filter.key)]) === value);
            });
        }

        return result;
    }, [data, search, searchValue, filters, filterValues]);

    const table = useReactTable({
        data: filteredData,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        manualPagination: true,
        pageCount: totalPages,
    });

    return (
        <div className="space-y-3">
            <DataTableToolbar
                search={search}
                filters={filters}
                searchValue={searchValue}
                onSearchChange={setSearchValue}
                filterValues={filterValues}
                onFilterChange={(key, value) =>
                    setFilterValues((prev) => ({
                        ...prev,
                        [key]: value,
                    }))
                }
            />
            <div className="border border-slate-100 rounded-xl overflow-hidden bg-white">
                <DataTableTable table={table} emptyMessage={emptyMessage} />
                <DataTablePagination
                    total={total}
                    page={page}
                    perPage={perPage}
                    totalPages={totalPages}
                    onPageChange={onPageChange}
                />
            </div>
        </div>
    );
};

export default DataTable;
export type { DataTableProps } from "./types";
