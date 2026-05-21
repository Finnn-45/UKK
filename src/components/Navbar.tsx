"use client";

import Link from "next/link";
import { signOut, useSession } from "next-auth/react";

import {
  Sun,
  ShoppingBag,
  LogOut,
} from "lucide-react";

import { useCartStore } from "@/store/cartStore";

export default function Navbar() {
  const { data: session } = useSession();
  const cart = useCartStore((state) => state.cart);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="relative z-50 flex flex-wrap items-center justify-between gap-4 px-6 md:px-10 py-5 max-w-7xl mx-auto bg-white/90 backdrop-blur-xl border border-orange-100 shadow-[0_25px_60px_rgba(251,146,60,0.12)] rounded-[2rem] mt-6">
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-tr from-orange-500 to-amber-400 p-3 rounded-2xl shadow-lg shadow-orange-200">
          <Sun size={22} className="text-white" />
        </div>
        <div>
          <span className="text-2xl font-black tracking-tight text-slate-900">
            RICE
            <span className="text-orange-500">&</span>
            SHINE
          </span>
          <p className="text-sm text-slate-500 mt-1">Premium Catering</p>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden lg:flex items-center gap-10 font-semibold text-[13px] uppercase tracking-[0.28em] text-slate-600">
          <Link href="/" className="transition-colors hover:text-orange-500">
            Home
          </Link>
          <Link href="/menu" className="transition-colors hover:text-orange-500">
            Menu
          </Link>
          <a href="#" className="transition-colors hover:text-orange-500">
            About
          </a>
        </div>

        <div className="flex items-center gap-3">
          {session?.user ? (
            <button
              type="button"
              onClick={() => signOut({ callbackUrl: '/' })}
              className="hidden sm:inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition"
            >
              <LogOut size={16} />
              Logout
            </button>
          ) : (
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center gap-2 rounded-2xl border border-orange-200 bg-orange-50 px-4 py-2 text-sm font-semibold text-orange-700 hover:bg-orange-100 transition"
            >
              Login
            </Link>
          )}

          <Link href="/cart" className="relative inline-flex items-center justify-center rounded-2xl bg-orange-500 p-3 text-white shadow-xl shadow-orange-300/40 hover:bg-orange-600 transition">
            <ShoppingBag size={20} />
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-slate-950 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white font-bold">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}