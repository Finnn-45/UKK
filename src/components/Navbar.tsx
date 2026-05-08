"use client";

import Link from "next/link";

import {
  Sun,
  ShoppingBag,
} from "lucide-react";

export default function Navbar() {
  return (
    <nav className="relative z-50 flex items-center justify-between px-6 md:px-10 py-6 max-w-7xl mx-auto">

      {/* LOGO */}
      <div className="flex items-center gap-3">
        <div className="bg-gradient-to-tr from-amber-400 to-orange-500 p-3 rounded-2xl shadow-lg shadow-orange-200">
          <Sun size={22} className="text-white" />
        </div>

        <span className="text-2xl font-black tracking-tight">
          RICE
          <span className="text-orange-500">&</span>
          SHINE
        </span>
      </div>

      {/* MENU */}
      <div className="flex items-center gap-10">

        <div className="hidden lg:flex items-center gap-10 font-bold text-[13px] uppercase tracking-widest">

          <Link
            href="/"
            className="hover:text-orange-500 transition-all"
          >
            Home
          </Link>

          <Link
            href="/menu"
            className="hover:text-orange-500 transition-all"
          >
            Menu
          </Link>

          <a
            href="#"
            className="hover:text-orange-500 transition-all"
          >
            About
          </a>
        </div>

        {/* CART */}
        <button className="relative bg-white p-3 rounded-2xl shadow-sm border border-gray-100">

          <ShoppingBag
            size={20}
            className="text-gray-700"
          />

          <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white font-bold">
            2
          </span>
        </button>
      </div>
    </nav>
  );
}