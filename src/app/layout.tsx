import type { Metadata } from "next";
import "@radix-ui/themes/styles.css";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./header";
import { Theme, ThemePanel } from "@radix-ui/themes";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import Avatar from "@/components/Avatar";
import Logout from "@/components/Logout";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="light">
      <body className={inter.className}>
        <Theme accentColor="violet">
          <Header>
              <Suspense fallback={<div>Loading.....</div>}>
                <Avatar />
                <Logout/>
              </Suspense>
          </Header>
          <main className="px-5">{children}</main>
          <Toaster position="bottom-right" />
          {/* <ThemePanel/> */}
        </Theme>
      </body>
    </html>
  );
}