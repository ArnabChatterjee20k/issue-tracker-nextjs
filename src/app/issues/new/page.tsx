"use client";
import { TextField, Button, Text } from "@radix-ui/themes";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { Controller, useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import issuesValidation from "@/lib/validation/issuesValidation";
import { z } from "zod";

type IssueForm = z.infer<typeof issuesValidation>;
export default function page() {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IssueForm>({
    resolver: zodResolver(issuesValidation),
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  async function createIssue(data: IssueForm) {
    setLoading(true);
    try {
      const res = await axios.post("/api/issues", data);
      if (res.status === 200){ toast.success("success");router.push("/issues")};
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorPayload: string[][] = error.response?.data?.errors;
        const errors = errorPayload.flat();
        errors.forEach((e) => toast.error(e));
      }
    } finally {
      setLoading(false);
    }
  }
  return (
    <form
      className="max-w-xl space-y-3"
      onSubmit={handleSubmit((data) => createIssue(data))}
    >
      <TextField.Root placeholder="Issue Title" {...register("title")} />
      {errors?.title ? <Text color="red">{errors?.title.message}</Text> : ""}
      <Controller
        name="description"
        control={control}
        render={({ field }) => (
          <SimpleMDE className="mb-1" placeholder="Enter Issue Description" {...field} />
        )}
      />
      {errors?.description ? (
        <Text className="-mt-8" color="red">{errors?.description.message}</Text>
      ) : (
        ""
      )}

      <Button loading={loading} type="submit">
        Submit Issue
      </Button>
    </form>
  );
}
