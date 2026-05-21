"use client";

import { useMemo, useState } from "react";

import MenuCard from "@/components/MenuCard";
import SearchBar from "@/components/SearchBar";

import { Menu } from "@/types/menu";

const KATEGORI = [
  "Semua",
  "Breakfast",
  "Lunch",
  "Dessert",
];

type Props = {
  menus: Menu[];
};

export default function MenuClient({
  menus,
}: Props) {
  const [selectedCategory, setSelectedCategory] =
    useState("Semua");

  const [searchQuery, setSearchQuery] =
    useState("");

  const filteredMenu = useMemo(() => {
    return menus.filter((item) => {
      const matchesCategory =
        selectedCategory === "Semua" ||
        item.category === selectedCategory;

      const matchesSearch = item.title
        .toLowerCase()
        .includes(searchQuery.toLowerCase());

      return (
        matchesCategory &&
        matchesSearch
      );
    });
  }, [
    menus,
    selectedCategory,
    searchQuery,
  ]);

  return (
    <div className="min-h-screen bg-[#F6F5F2] overflow-x-hidden">

      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-8%] w-[320px] md:w-[420px] h-[320px] md:h-[420px] bg-orange-200 rounded-full blur-[120px] opacity-70" />
        <div className="absolute bottom-[-12%] left-[-8%] w-[320px] md:w-[420px] h-[320px] md:h-[420px] bg-slate-950 rounded-full blur-[140px] opacity-15" />
        <div className="absolute top-[35%] left-[-5%] w-60 h-60 bg-amber-200/60 rounded-full blur-3xl" />
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="mb-14 grid gap-10 lg:grid-cols-[1.4fr_0.9fr] items-start">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-slate-200 px-4 py-2 rounded-full shadow-sm mb-6">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-widest">
                International Catering
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[0.92] mb-5 text-slate-900">
              Menu Katering
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-rose-500">
                yang Memikat Selera Dunia
              </span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-xl">
              Sajian premium, plating berkelas, dan kombinasi rasa modern untuk acara kadonya, meeting, dan pesta yang ingin tampil beda.
            </p>
          </div>

          <div className="rounded-[2rem] border border-slate-200 bg-white/90 backdrop-blur-xl shadow-[0_30px_80px_rgba(15,23,42,0.08)] p-6">
            <div className="flex items-start justify-between gap-4 mb-6">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-slate-400 font-bold">
                  Signature Picks
                </p>
                <h3 className="text-2xl font-black mt-2 text-slate-900">
                  Chef Special
                </h3>
              </div>
              <div className="bg-gradient-to-br from-orange-100 to-rose-100 text-orange-500 w-14 h-14 rounded-3xl flex items-center justify-center text-2xl shadow-inner">
                🍽️
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-5">
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-2">
                  Paket
                </p>
                <p className="text-3xl font-black text-slate-900">{filteredMenu.length}</p>
              </div>
              <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-[11px] uppercase tracking-[0.2em] text-slate-400 font-bold mb-2">
                  Rating rata-rata
                </p>
                <p className="text-3xl font-black text-orange-500">4.9 ⭐</p>
              </div>
            </div>

            <p className="text-sm text-slate-500 leading-relaxed">
              Temukan menu catering ala hotel bintang lima dengan kombinasi rasa lokal dan internasional. Perfect untuk event perusahaan atau pesta privat.
            </p>
          </div>
        </div>

        <div className="sticky top-3 z-40 rounded-[2rem] border border-slate-200 bg-white/90 backdrop-blur-2xl p-5 shadow-sm mb-10">
          <div className="grid gap-5 lg:grid-cols-[1fr_auto] items-center">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <div className="hidden lg:flex items-center gap-3 text-slate-500 text-sm">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-2xl bg-slate-100 text-slate-600">
                ✨
              </span>
              Cari menu premium, catering acara, atau rekomendasi chef.
            </div>
          </div>

          <div className="mt-5 flex flex-wrap gap-3">
            {KATEGORI.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 rounded-2xl px-5 py-3 text-sm font-semibold transition duration-300 ${
                  selectedCategory === cat
                    ? "bg-slate-950 text-white shadow-lg shadow-slate-950/10"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6 px-1">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">Koleksi Menu</h2>
            <p className="text-slate-500 text-sm mt-1">{filteredMenu.length} pilihan menu siap dibawa ke acara Anda.</p>
          </div>
          <div className="inline-flex items-center gap-2 rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-600 shadow-sm">
            <span className="text-lg">🌍</span>
            Catering gaya internasional, disajikan rapi.
          </div>
        </div>

        {filteredMenu.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredMenu.map((menu) => (
              <MenuCard key={menu.id} menu={menu} />
            ))}
          </div>
        ) : (
          <div className="rounded-[2.5rem] border border-slate-200 bg-white p-10 text-center shadow-sm">
            <div className="text-6xl mb-5">😢</div>
            <h2 className="text-3xl font-black mb-3 text-slate-900">Menu Tidak Ditemukan</h2>
            <p className="text-slate-500 max-w-md mx-auto leading-relaxed">
              Coba kata kunci lain atau pilih kategori berbeda biar dapet menu favoritmu ✨
            </p>
          </div>
        )}
      </main>
    </div>
  );
}