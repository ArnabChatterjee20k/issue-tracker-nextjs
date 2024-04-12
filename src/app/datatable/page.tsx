import { redirect } from "next/navigation";
import DataTable from "./Datatable";
import { columns, type Payment } from "./columns";

async function getData(): Promise<Payment[]> {
  return [
    {
      id: "1",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },
    {
      id: "2",
      amount: 0,
      status: "failed",
      email: "sldjf",
    },
    {
      id: "3",
      amount: 0,
      status: "failed",
      email: "sldjf",
    },
    {
      id: "4",
      amount: 0,
      status: "failed",
      email: "sldjf",
    },
    {
      id: "5",
      amount: 0,
      status: "failed",
      email: "sldjf",
    },

    {
      id: "6",
      amount: 0,
      status: "failed",
      email: "sldjf",
    },
    {
      id: "7",
      amount: 0,
      status: "failed",
      email: "sldjf",
    },
    {
      id: "8",
      amount: 0,
      status: "failed",
      email: "sldjf",
    },
    {
      id: "9",
      amount: 0,
      status: "failed",
      email: "sldjf",
    },
    {
      id: "10",
      amount: 0,
      status: "failed",
      email: "sldjf",
    },
    {
      id: "lsdjfsf",
      amount: 0,
      status: "failed",
      email: "sldjf",
    },
    {
      id: "lsdjfsf",
      amount: 0,
      status: "failed",
      email: "sldjf",
    },
  ];
}

export default async function page({ searchParams = { page: "1" } }) {
  const { page } = searchParams;
  if(parseInt(page)===0) redirect("?page=1")
  const itemsPerPage = 3;
  const start = (parseInt(page) - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  console.log("rendering")

  return (
    <div>
      <DataTable columns={columns} data={(await getData()).slice(start, end)} />
    </div>
  );
}
