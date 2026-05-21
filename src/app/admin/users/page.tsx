"use client";

import { useState } from "react";

export default function AdminUsersPage() {
  const [query, setQuery] = useState("");

  // Halaman ini disiapkan biar route /admin/users tidak kosong.
  // Data users bisa ditambahkan nanti (ambil dari API/DB).

  return (
    <div className="w-full">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900">Users</h1>
          <p className="text-sm md:text-base text-slate-500 mt-1">
            Kelola user customer dan hak akses.
          </p>
        </div>

        <div className="w-full md:w-[340px]">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari user..."
            className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-indigo-100"
          />
        </div>
      </div>

      <div className="rounded-[2rem] border border-slate-200 bg-white p-5 md:p-8 shadow-sm">
        <div className="text-center py-10">
          <div className="mx-auto w-16 h-16 rounded-3xl bg-indigo-50 flex items-center justify-center">
            <span className="text-3xl">👥</span>
          </div>
          <h2 className="text-xl md:text-2xl font-bold text-slate-900 mt-4">
            Belum ada data users
          </h2>
          <p className="text-slate-500 mt-2 text-sm md:text-base">
            Route <span className="font-semibold">/admin/users</span> sudah dibuat agar tidak kosong.
          </p>
        </div>
      </div>
    </div>
  );
}

