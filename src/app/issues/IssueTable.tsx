"use client";
import {
  ColumnDef,
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  flexRender,
  SortingState,
} from "@tanstack/react-table";

import {
  Table,
  TableHeader,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useState, useTransition } from "react";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  pages: number;
}

export default function IssueTable<TData, TValue>({
  columns,
  data,
  pages,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    manualPagination: true,
    pageCount: -1,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    enableMultiSort: true,
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const currentPage = parseInt(searchParams.get("page") || "1");

  function handleNextPage() {
    const nextPage = `page=${currentPage}+1`;
    router.push(`${pathname}?${nextPage}`);
  }

  function handlePrevPage() {
    const prevPage = `page=${currentPage}-1`;
    router.push(`${pathname}?${prevPage}`);
  }

  return (
    <div>
      <div className="flex gap-5">
        <SearchParamsSetter
          defaultValue={5}
          label="Items Per Page"
          options={[5, 10, 20]}
          searchParamKey="limit"
        />
        <SearchParamsSetter
          defaultValue={1}
          label="Current Page"
          options={Array.from({ length: pages }, (_, i) => i + 1)}
          searchParamKey="page"
        />
      </div>
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
    </div>
  );
}

function SearchParamsSetter<TValue extends string | number>({
  defaultValue,
  options,
  label,
  searchParamKey,
}: {
  defaultValue: TValue;
  options: TValue[];
  label: string;
  searchParamKey: string;
}) {
  const [isPending, startTransition] = useTransition();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const params = new URLSearchParams(Array.from(searchParams.entries()));
  const currentValue =
    searchParams.get(searchParamKey) || defaultValue.toString();

  if (
    !options.includes(
      (typeof defaultValue === "string"
        ? currentValue
        : parseInt(currentValue)) as TValue
    )
  ) {
    params.set(searchParamKey, defaultValue as string);
    router.push(`${pathname}?${params}`);
  }

  function handleChange(value: string): void {
    startTransition(() => {
      params.set(searchParamKey, value);
      router.push(`${pathname}?${params}`);
    });
  }
  return (
    <Select value={currentValue} onValueChange={handleChange}>
      <SelectTrigger className="max-w-[150px]" disabled={isPending}>
        {isPending ? "Loading..." : label}
      </SelectTrigger>
      <SelectContent>
        {!isPending && (
          <SelectGroup>
            <SelectLabel>{label}</SelectLabel>
            {options.map((option) => (
              <SelectItem value={option.toString()}>{option}</SelectItem>
            ))}
          </SelectGroup>
        )}
      </SelectContent>
    </Select>
  );
}
