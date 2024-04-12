"use client";

import { ColumnDef } from "@tanstack/react-table";

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ cell }) => {
      const status = cell.getValue() as Payment["status"];
      const color = new Set(["pending", "failed"]).has(status)
        ? "bg-red-100"
        : "bg-white";
      return <div className={color}>{status}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "id",
    header: "id",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
];
