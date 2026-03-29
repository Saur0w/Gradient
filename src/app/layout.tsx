import type { Metadata } from "next";
import "./globals.css";
import React from "react";
import Header from "@/components/Header";
import Theme from "@/components/Theme";


export const metadata: Metadata = {
  title: "Saurow",
  description: "~@saur0w(GitHub) X(@sauroww)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
      <Theme>
      <Header />
        {children}
      </Theme>
      </body>
    </html>
  );
}
