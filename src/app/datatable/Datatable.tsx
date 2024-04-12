"use client";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableHeader,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "@/components/ui/table";

import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
} from "@tanstack/react-table";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export default function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: -1
  });

  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();

  console.log({ data });
  return (
    <div>
      {/* table */}
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* Pagination */}
      <div className="flex items-center justify-end space-x-2 py-4">
        <label htmlFor="pages">Page number</label>
        <select id="pages">
          <option>{table.options.pageCount}</option>
        </select>
        <Button
          variant="outline"
          size="sm"
          onClick={() =>
            router.push(
              `${pathName}?page=${
                (parseInt(searchParams.get("page")) || 1) - 1
              }`
            )
          }
        >
          Previous
        </Button>
        <Button
          onClick={() =>
            router.push(
              `${pathName}?page=${
                (parseInt(searchParams.get("page")) || 1) + 1
              }`
            )
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}
