import { getSession } from "@/app/actions/action";
import db from "@/db/db";
import Issues from "@/db/models/issues";
import issuesValidation from "@/lib/validation/issuesValidation";
import { unsealData } from "iron-session";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  await db();
  const { userId, isLoggedIn } = await getSession();
  console.log({ userId, isLoggedIn });
  if (!isLoggedIn)
    return NextResponse.json(
      { status: "Bad Auth", errors: ["Not logged in"] },
      { status: 400 }
    );
  const body = await request.json();
  const result = issuesValidation.safeParse(body);
  if (!result.success) {
    const errors = result.error.format();
    return NextResponse.json(
      {
        status: "Please enter all the fields",
        errors: [
          errors.description?._errors,
          errors.title?._errors,
          // errors?.userID?._errors,
        ],
      },
      { status: 400 }
    );
  }
  const { title, description } = result.data;
  const newIssue = new Issues({ title, description, user: userId });
  const savedIssue = await newIssue.save();
  return NextResponse.json({ status: "successfull", savedIssue });
}