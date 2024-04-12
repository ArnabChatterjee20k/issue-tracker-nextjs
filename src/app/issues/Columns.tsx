"use client"
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
export type ColumnType = {
  _id: string;
  status: string;
  title: string;
  description: string;
};

export const issueColumns: ColumnDef<ColumnType>[] = [
  { accessorKey: "_id", header: "ID" },
  { accessorKey: "title",sortDescFirst:true, header: ({column})=>{
    return (
      <Button
        variant="ghost"
        onClick={() => column.toggleSorting()}
      >
        Title ^
      </Button>
    )
  }},
  { accessorKey: "status", header: "Status" },
];
