"use client";

import { useMemo, useState } from "react";

import Navbar from "@/components/Navbar";
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
    <div className="min-h-screen bg-[#FAFAFA] overflow-x-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">

        <div className="absolute top-[-10%] right-[-5%] w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-orange-100 rounded-full blur-[120px] opacity-60" />

        <div className="absolute bottom-[-10%] left-[-5%] w-[300px] md:w-[400px] h-[300px] md:h-[400px] bg-green-100 rounded-full blur-[120px] opacity-60" />
      </div>

      {/* NAVBAR */}
      <Navbar />

      {/* CONTENT */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">

     {/* HEADER */}
<div className="mb-10 sm:mb-16 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">

  {/* LEFT CONTENT */}
  <div className="max-w-2xl">

    {/* BADGE */}
    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-md border border-gray-100 px-4 py-2 rounded-full shadow-sm mb-6">

      <div className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />

      <span className="text-xs sm:text-sm font-bold text-gray-600 uppercase tracking-widest">
        Fresh Everyday
      </span>
    </div>

    <h1 className="text-4xl sm:text-5xl md:text-7xl font-black tracking-tight leading-[0.95] mb-5 text-left">
      Jelajahi
      <br />

      <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500">
        Rasa ✨
      </span>
    </h1>

    <p className="text-sm sm:text-base text-gray-500 leading-relaxed text-left max-w-xl">
      Healthy bowl, fresh ingredient,
      dan energi baru setiap hari
      untuk bikin harimu lebih hidup 🌿
    </p>
  </div>

  {/* RIGHT CARD */}
  <div className="w-full lg:w-[320px] bg-white/80 backdrop-blur-xl border border-gray-100 rounded-[2rem] p-5 shadow-xl">

    <div className="flex items-center justify-between mb-5">

      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-gray-400 font-bold">
          Today Menu
        </p>

        <h3 className="text-2xl font-black mt-1">
          Healthy Bowl 🥗
        </h3>
      </div>

      <div className="bg-orange-100 text-orange-500 w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-inner">
        🍜
      </div>
    </div>

    {/* MINI STATS */}
    <div className="grid grid-cols-2 gap-4">

      <div className="bg-[#FAFAFA] rounded-2xl p-4 border border-gray-100">
        <p className="text-gray-400 text-xs uppercase font-bold mb-1">
          Menu
        </p>

        <h4 className="text-2xl font-black">
          {filteredMenu.length}+
        </h4>
      </div>

      <div className="bg-[#FAFAFA] rounded-2xl p-4 border border-gray-100">
        <p className="text-gray-400 text-xs uppercase font-bold mb-1">
          Rating
        </p>

        <h4 className="text-2xl font-black text-orange-500">
          4.9
        </h4>
      </div>
    </div>
  </div>
</div>

        {/* FILTER */}
        <div className="sticky top-3 z-40 bg-white/80 backdrop-blur-2xl border border-gray-100 rounded-[2rem] p-4 sm:p-5 mb-10 sm:mb-16 shadow-sm">

          {/* SEARCH */}
          <div className="mb-5">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
            />
          </div>

          {/* CATEGORY */}
          <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-1">

            {KATEGORI.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setSelectedCategory(cat)
                }
                className={`shrink-0 px-5 py-3 rounded-2xl font-bold text-sm transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-[#2D2424] text-white shadow-lg shadow-black/10 scale-105"
                    : "bg-white text-gray-500 border border-gray-100 hover:border-orange-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* RESULT INFO */}
        <div className="flex items-center justify-between mb-6 px-1">

          <div>
            <h2 className="text-2xl sm:text-3xl font-black">
              Menu Pilihan
            </h2>

            <p className="text-gray-400 text-sm mt-1">
              {filteredMenu.length} menu ditemukan
            </p>
          </div>

          <div className="hidden sm:flex bg-white border border-gray-100 rounded-2xl px-5 py-3 shadow-sm">
            <span className="font-bold text-gray-500 text-sm">
              🍽️ Fresh & Healthy
            </span>
          </div>
        </div>

        {/* MENU GRID */}
        {filteredMenu.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">

            {filteredMenu.map((menu) => (
              <MenuCard
                key={menu.id}
                menu={menu}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-[2.5rem] p-10 sm:p-16 text-center border border-gray-100 shadow-sm">

            <div className="text-6xl mb-5">
              😢
            </div>

            <h2 className="text-3xl font-black mb-3">
              Menu Tidak Ditemukan
            </h2>

            <p className="text-gray-500 max-w-md mx-auto leading-relaxed">
              Coba kata kunci lain atau
              pilih kategori berbeda biar
              dapet menu favoritmu ✨
            </p>
          </div>
        )}
      </main>
    </div>
  );
}