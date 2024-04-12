import React, { Suspense } from "react";
import IssuesPage from "./IssuePage";

export default function page({ searchParams = { page: "1", limit: "1" } }) {
  return (
    <>
      <h1>Hello User</h1>
      <Suspense key={searchParams.page} fallback={<h1>Loading.....</h1>}>
        <IssuesPage searchParams={searchParams} />
      </Suspense>
    </>
  );
}
