import type { Metadata } from 'next';

import '../globals.css';
import UserNav from '@/components/courses/UserNav';
import Footers from '@/components/Footer';
import SideBar from '@/components/AdminSidebar';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
        <Footers />
      </body>
    </html>
  );
}