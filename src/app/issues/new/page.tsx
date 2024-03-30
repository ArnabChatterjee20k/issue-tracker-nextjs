"use client";
import { TextField, Button } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
export default function page() {
  return (
    <div className="max-w-xl space-y-3">
      <TextField.Root placeholder="Issue Title"></TextField.Root>
      <SimpleMDE placeholder="Enter Issue Description" />
      <Button>Submit Issue</Button>
    </div>
  );
}
