"use client";

import { SessionProvider } from "next-auth/react";
import { CartProvider } from "@/context/CartContext";

export function AppProviders({ children }: { children: React.ReactNode }) {
  // Matikan NextAuth SessionProvider untuk route admin supaya tidak ada fetch `/api/auth/session`
  // yang bisa mengganggu login admin berbasis cookie JWT `token`.
  const isAdmin = typeof window !== 'undefined' && window.location.pathname.startsWith('/admin');

  return (
    <>
      {isAdmin ? (
        <CartProvider>{children}</CartProvider>
      ) : (
        <SessionProvider>
          <CartProvider>{children}</CartProvider>
        </SessionProvider>
      )}
    </>
  );
}


