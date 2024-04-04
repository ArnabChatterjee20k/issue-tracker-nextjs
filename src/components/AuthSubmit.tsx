"use client";
import { Button } from "@radix-ui/themes";
import { useFormStatus } from "react-dom";
interface IProps {
  text: string;
}
export default function AuthSubmit({ text }: IProps) {
  const { pending } = useFormStatus();
  return (
    <>
      <Button
        className={`w-full ${pending?"hover:bg-gray-600":"bg-black"} cursor-pointer hover:bg-gray-600`}
        loading={pending}
      >
        {text}
      </Button>
    </>
  );
}
