"use client"
import React, { Suspense } from "react";
import { FaBug } from "react-icons/fa6";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getSession } from "./actions/action";

const links = [
  { link: "/dashboard", name: "Dashboard" },
  { link: "/issues", name: "Issues" },
];
export default function Header({children}:{children:React.ReactNode}) {
  const pathname = usePathname();

  return (
    <nav className="flex px-6 h-14 items-center space-x-6 border border-b mb-5">
      <Link href="/">
        <FaBug />
      </Link>
      <ul className="space-x-5 flex">
        {links.map(({ link, name }) => (
          <Link
            href={link}
            className={`${
              pathname === link ? "text-gray-900" : "text-gray-600"
            }  hover:text-gray-900 font-medium transition-colors ease-in`}
          >
            {name}
          </Link>
        ))}
      </ul>
      {children}
    </nav>
  );
}
