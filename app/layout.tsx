import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "./Skeleton";

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
        <Skeleton>
          <App>{children}</App>
        </Skeleton>
      </body>
    </html>
  );
}
