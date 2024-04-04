"use client"
import { logout } from "@/app/actions/action"
import { Button } from "@radix-ui/themes"

export default function Logout() {
  return (
    <Button onClick={async()=>await logout()}>Logout</Button>
  )
}