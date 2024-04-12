"use client";
import { Button } from "@radix-ui/themes";

export default function Issues({ children }: { children: React.ReactNode }) {
  return (
    <section>
      <NewIssueButton />
      {children}
    </section>
  );
}

function NewIssueButton() {
  return (
    <div>
      <Button>New Issue</Button>
    </div>
  );
}
