import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Saurow",
  description: "~@saur0w(GitHub) @sauroww(X)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <Header />
        {children}
      </body>
    </html>
  );
}
