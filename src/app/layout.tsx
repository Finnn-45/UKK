

import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/context/AppProviders";

export const metadata: Metadata = {
  title: "Rice & Shine",
  description: "Modern Catering Website",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}

