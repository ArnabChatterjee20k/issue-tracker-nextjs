"use client";

import { useFormState, useFormStatus } from "react-dom";
import { register } from "../actions/action";
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

function registerActionWrapper(
  prevState: { error: undefined | string },
  registerData: FormData
) {
  register({
    email: registerData.get("email") as string,
    password: registerData.get("password") as string,
  });
}

const Form = () => {
  const [state, formAction] = useFormState<any, FormData>(
    registerActionWrapper,
    null
  );
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl font-bold">Signup</CardTitle>
        <CardDescription>
          Enter your email below to create your account
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
          <AuthSubmit text="Signup" />
        </div>
        <div className="mt-4 text-center text-sm">
          Already have an account?
          <Link  className="underline" href="/login">
            Login
          </Link>
        </div>
      </form>
    </Card>
  );
};

export default Form;
