

import type { Metadata } from "next";
import "./globals.css";
import { AppProviders } from "@/context/AppProviders";
import RootLayoutShell from "@/components/RootLayoutShell";

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
        <AppProviders>
          <RootLayoutShell>{children}</RootLayoutShell>
        </AppProviders>
      </body>
    </html>
  );
}

