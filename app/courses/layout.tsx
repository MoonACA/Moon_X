import type { Metadata } from "next";
import React, { useState, useEffect } from "react";

import "../globals.css";
import UserNav from "@/components/courses/UserNav";
import SideBar from "@/components/courses/SideBar";
import Footer from "@/components/Footer";
import BottomNavBar from "@/components/courses/BottomNav";

export const metadata: Metadata = {
  title: "Moonx",
  description: "learn and earn",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className=" bg-[#00122C]">
        <SideBar />
        <UserNav />
        <div className=" py-[5rem] w-[80vw] mx-auto max-sm:w-[90vw]">
          {children}
        </div>
        <BottomNavBar />
      </body>
    </html>
  );
}
