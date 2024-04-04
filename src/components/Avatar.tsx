"use server";
import { getSession } from "@/app/actions/action";
import React from "react";
import getProfile from "gradient-avatar";
import Link from "next/link";

export default async function Avatar() {
  const session = await getSession();
  const { userId } = session;
  const profile = session.isLoggedIn ? getProfile(userId!, 25) : "";
  if (session.isLoggedIn)
    return (
      <button
        id="avatar"
        className="border-2 hover:border-slate-600 rounded-full transition-all ease-in-out"
        dangerouslySetInnerHTML={{ __html: profile }}
      />
    );
  return (
    <Link
      id="avatar"
      href="/login"
      className="border-2 h-[25px] w-[25px] bg-gray-600 hover:border-slate-600 rounded-full transition-all ease-in-out"
    />
  );
}
