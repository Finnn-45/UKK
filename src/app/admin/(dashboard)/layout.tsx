"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UtensilsCrossed,
  PlusCircle,
  Users,
  Settings,
  Search,
  Bell,
  ChevronDown,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [loggingOut, setLoggingOut] = useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    await fetch("/api/admin/logout", {
      method: "POST",
    });

    router.push("/admin/login");
  };

  return (
    <div className="min-h-screen bg-[#f3f4f6]">
      {/* Gradient Top */}
      <div className="fixed top-0 left-0 w-full h-64 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 -z-10" />

      <div className="flex">
        {/* SIDEBAR */}
        <aside className="hidden lg:flex flex-col w-[280px] h-screen sticky top-0 bg-[#111827] text-white shadow-2xl">
          {/* Logo */}
          <div className="h-20 flex items-center px-8 border-b border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-indigo-500 flex items-center justify-center font-bold text-lg">
              R
            </div>

            <div className="ml-4">
              <h1 className="font-bold text-xl">RiceAdmin</h1>
              <p className="text-xs text-slate-400">Dashboard Panel</p>
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
            <SidebarItem
              href="/admin"
              icon={<LayoutDashboard size={18} />}
              label="Dashboard"
              active={pathname === "/admin"}
            />

            <SidebarItem
              href="/admin/menu"
              icon={<UtensilsCrossed size={18} />}
              label="Menu"
              active={pathname === "/admin/menu"}
            />

            <SidebarItem
              href="/admin/create"
              icon={<PlusCircle size={18} />}
              label="Tambah Menu"
              active={pathname === "/admin/create"}
            />

            <SidebarItem
              href="/admin/users"
              icon={<Users size={18} />}
              label="Users"
              active={pathname === "/admin/users"}
            />

            <SidebarItem
              href="/admin/settings"
              icon={<Settings size={18} />}
              label="Settings"
              active={pathname === "/admin/settings"}
            />
          </nav>

          {/* Footer */}
          <div className="p-5 border-t border-slate-800">
            <button
              onClick={handleLogout}
              className="w-full rounded-xl bg-slate-800 hover:bg-slate-700 transition py-3 text-sm font-semibold"
            >
              {loggingOut ? "Loading..." : "Logout"}
            </button>
          </div>
        </aside>

        {/* MAIN */}
        <main className="flex-1 p-5 lg:p-8">
          {/* NAVBAR */}
          <div className="h-20 bg-white rounded-3xl shadow-sm border border-slate-200 flex items-center justify-between px-8 mb-8">
            {/* Search */}
            <div className="flex items-center gap-3 bg-slate-100 rounded-2xl px-5 py-3 w-[350px]">
              <Search size={18} className="text-slate-400" />

              <input
                type="text"
                placeholder="Type to search..."
                className="bg-transparent outline-none text-sm w-full"
              />
            </div>

            {/* Right */}
            <div className="flex items-center gap-5">
              <button className="w-11 h-11 rounded-full bg-slate-100 flex items-center justify-center">
                <Bell size={18} />
              </button>

              <div className="flex items-center gap-3">
                <div className="text-right hidden sm:block">
                  <h3 className="text-sm font-semibold text-slate-800">
                    Arfin Desca
                  </h3>

                  <p className="text-xs text-slate-500">
                    Administrator
                  </p>
                </div>

                <div className="w-11 h-11 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 text-white flex items-center justify-center font-bold">
                  AD
                </div>

                <ChevronDown size={18} className="text-slate-500" />
              </div>
            </div>
          </div>

          {/* CONTENT */}
          {children}
        </main>
      </div>
    </div>
  );
}

function SidebarItem({
  href,
  icon,
  label,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-5 py-3 rounded-2xl transition-all text-sm font-medium
      ${
        active
          ? "bg-slate-700 text-white"
          : "text-slate-400 hover:bg-slate-800 hover:text-white"
      }`}
    >
      {icon}
      {label}
    </Link>
  );
}