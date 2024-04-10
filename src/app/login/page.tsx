"use client";

import { useFormState, useFormStatus } from "react-dom";
import { login } from "../actions/action";
import AuthSubmit from "@/components/AuthSubmit";

import {
  CardTitle,
  CardDescription,
  CardHeader,
  Card,
} from "@/components/ui/card";

import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import toast from "react-hot-toast";

async function loginActionWrapper(
  prevState: { error: undefined | string },
  registerData: FormData
) {
  const res = await login({
    email: registerData.get("email") as string,
    password: registerData.get("password") as string,
  });
  if (res?.status === "error")
    toast.error(res?.message || "Some error occured");
}

const LoginForm = () => {
  const [state, formAction] = useFormState<any, FormData>(
    loginActionWrapper,
    null
  );
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <form action={formAction} className="p-6 pt-0">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="m@example.com"
              required
              type="email"
              name="email"
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center">
              <Label htmlFor="password">Password</Label>
            </div>
            <Input name="password" id="password" required type="password" />
          </div>
          <AuthSubmit text="Login" />
        </div>
        <div className="mt-4 text-center text-sm">
          Don't have an account?
          <Link className="underline" href="/register">
            Sign up
          </Link>
        </div>
      </form>
    </Card>
  );
};

export default LoginForm;
