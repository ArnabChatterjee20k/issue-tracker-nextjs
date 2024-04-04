"use server";
import {
  RegisterForm,
  SessionData,
  defaultSession,
  sessionOptions,
} from "@/lib/authentication";
import { UserUtils } from "@/lib/utils/userUtils";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect, RedirectType } from "next/navigation";

export const getSession = async () => {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  if (!session.isLoggedIn) {
    session.isLoggedIn = defaultSession.isLoggedIn;
  }
  return session;
};
export const register = async (registerData: RegisterForm) => {
  const { email, password } = registerData;
  const { exists, user } = await UserUtils.isUserExists(email);
  if (exists) return { status: "error", message: "bad auth" };
  const userId = await UserUtils.createUser(email, password);
  const session = await getSession();
  session.isLoggedIn = true;
  session.userId = userId;
  await session.save();
  redirect("/");
};
export const login = async (registerData: RegisterForm) => {
  // const email = registerData.get("email") as string;
  // const password = registerData.get("password") as string;
  const { email, password } = registerData;
  const { valid, user } = await UserUtils.checkUser(email, password);
  if (!valid || !user) {
    return { status: "error", message: "wrong credentials" };
  }
  const session = await getSession();
  session.isLoggedIn = true;
  session.userId = user.id;
  session.save();
  redirect("/", RedirectType.replace);
};
export const logout = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/login")
};
