import { getSession } from "../actions/action";
import { issueColumns } from "./Columns";
import IssueTable from "./IssueTable";
import Issues from "@/db/models/issues";
export default async function IssuesPage({
  searchParams = { page: "1", limit: "10" },
}) {
  const { page, limit } = searchParams;
  const itemsPerPage = parseInt(limit) || 10;
  const end = (parseInt(page) - 1) * itemsPerPage;
  const { isLoggedIn, userId } = await getSession();
  const issuesOfUser = await Issues.find({ user: userId })
    .skip(end)
    .limit(itemsPerPage);
  const numberOfPages = await Issues.find(
    { user: userId },
    {}
  ).estimatedDocumentCount();
  return (
    <IssueTable
      data={issuesOfUser}
      columns={issueColumns}
      pages={Math.ceil(numberOfPages / itemsPerPage)}
    />
  );
}
