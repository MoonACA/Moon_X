import type { Metadata } from 'next';

import './globals.css';
import App from './App';

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
        <App>{children}</App>
      </body>
    </html>
  );
}
