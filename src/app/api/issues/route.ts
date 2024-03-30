import db from "@/db/db";
import Issues from "@/db/models/issues";
import issuesValidation from "@/lib/validation/issuesValidation";
import { NextRequest, NextResponse } from "next/server";

db();
export async function POST(request: NextRequest) {
  const body = await request.json();
  const result = issuesValidation.safeParse(body);
  if (!result.success) {
    const { errors } = result.error;
    return NextResponse.json(
      { status: "Please enter all the fields", errors },
      { status: 400 }
    );
  }
  const { title, description } = result.data;
  const newIssue = new Issues({ title, description });
  const savedIssue = await newIssue.save();
  return NextResponse.json({ status: "successfull", savedIssue });
}
