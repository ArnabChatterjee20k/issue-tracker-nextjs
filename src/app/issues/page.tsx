"use client"
import { Button } from "@radix-ui/themes";
import axios from "axios";
import React, { useEffect, useState } from "react";

export default function Issues() {
    const [issues,setIssues] = useState("")
    useEffect(()=>{
        axios.get("/api/issues").then(data=>setIssues(data.data?.data))
    },[])
  return (
    <div>
      <Button>New Issue</Button>
      <code>{issues}</code>
    </div>
  );
}