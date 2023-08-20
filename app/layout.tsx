import "./globals.css";
import { Inter } from "next/font/google";

import Toastify from "@/components/toastify";
import AuthProvider from "@/components/protected";
import TopBar from "@/components/TopBar";
import IsModeratorContextProvider from "@/contexts/IsModerator";

const inter = Inter({ subsets: ["latin"], fallback: ["sans-serif"] });

export const metadata = {
  title: "Poker planning",
  description: "Carry out poker planning session with your team",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toastify />
        <AuthProvider />
        <IsModeratorContextProvider>
          <TopBar />
          {children}
        </IsModeratorContextProvider>
      </body>
    </html>
  );
}
