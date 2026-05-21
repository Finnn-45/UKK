"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";

export default function RootLayoutShell({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideNavbar = pathname.startsWith("/admin") || pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar />}
      {children}
    </>
  );
}
