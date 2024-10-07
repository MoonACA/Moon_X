import type { Metadata } from "next";

import "../globals.css";
import UserNav from "@/components/courses/UserNav";
import SideBar from "@/components/courses/SideBar";
import Footers from "@/components/Footer";
import BottomNavBar from "@/components/courses/BottomNav";
export const metadata: Metadata = {
  title: "moonx courses",
  description: "profile",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SideBar />
        <UserNav />

        {children}
        <BottomNavBar />
        <Footers />
      </body>
    </html>
  );
}
