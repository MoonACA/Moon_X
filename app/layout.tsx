import type { Metadata } from 'next';

import './globals.css';
import Footers from '@/components/Footer';

export const metadata: Metadata = {
  title: 'Moon X',
  description: 'Future of Blockchain',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}

        <Footers />
      </body>
    </html>
  );
}
