import type { ColumnDef } from "@tanstack/react-table";

export type DataTableSearch<TData> = {
    placeholder?: string;
    keys: Array<keyof TData>;
};

export type DataTableFilterOption = {
    label: string;
    value: string;
};

export type DataTableFilter<TData> = {
    key: keyof TData;
    label: string;
    options: DataTableFilterOption[];
};

export type DataTableProps<TData> = {
    data: TData[];
    columns: ColumnDef<TData, unknown>[];
    emptyMessage?: string;
    total: number;
    page: number;
    perPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    search?: DataTableSearch<TData>;
    filters?: Array<DataTableFilter<TData>>;
};
