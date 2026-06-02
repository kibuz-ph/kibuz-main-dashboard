import { flexRender, type Table } from "@tanstack/react-table";
import { Table as UITable, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";

type DataTableTableProps<TData> = {
    table: Table<TData>;
    emptyMessage: string;
};

const DataTableTable = <TData,>({ table, emptyMessage }: DataTableTableProps<TData>) => {
    const headerGroups = table.getHeaderGroups();
    const rows = table.getRowModel().rows;
    const columnsCount = table.getVisibleLeafColumns().length;

    return (
        <UITable>
            <TableHeader>
                {headerGroups.map((headerGroup) => (
                    <TableRow key={headerGroup.id} className="bg-slate-50 hover:bg-slate-50 border-slate-100">
                        {headerGroup.headers.map((header) => {
                            const canSort = header.column.getCanSort();
                            const sorted = header.column.getIsSorted();
                            return (
                                <TableHead key={header.id} className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                    {header.isPlaceholder ? null : canSort ? (
                                        <button
                                            type="button"
                                            onClick={header.column.getToggleSortingHandler()}
                                            className="inline-flex items-center gap-1 text-xs font-semibold text-slate-500 uppercase tracking-wide hover:text-slate-700"
                                        >
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                            <span className="text-slate-400">
                                                {sorted === "asc" ? "^" : sorted === "desc" ? "v" : "="}
                                            </span>
                                        </button>
                                    ) : (
                                        <span className="inline-flex items-center text-xs font-semibold text-slate-500 uppercase tracking-wide">
                                            {flexRender(header.column.columnDef.header, header.getContext())}
                                        </span>
                                    )}
                                </TableHead>
                            );
                        })}
                    </TableRow>
                ))}
            </TableHeader>
            <TableBody>
                {rows.length === 0 ? (
                    <TableRow>
                        <TableCell colSpan={columnsCount} className="text-center py-16 text-slate-400 text-sm">
                            {emptyMessage}
                        </TableCell>
                    </TableRow>
                ) : (
                    rows.map((row) => (
                        <TableRow key={row.id} className="border-slate-50 hover:bg-slate-50/60 transition-colors">
                            {row.getVisibleCells().map((cell) => (
                                <TableCell key={cell.id}>
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                )}
            </TableBody>
        </UITable>
    );
};

export default DataTableTable;
