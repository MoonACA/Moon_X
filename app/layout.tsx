import type { Metadata } from "next";
import "./globals.css";
//import App from "./App";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
  title: "Moon X",
  description: "Future of Blockchain",
};
const App = dynamic(() => import("./App"), { ssr: false });
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
