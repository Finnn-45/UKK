"use client";

import { useMemo, useState } from "react";

import Link from "next/link";

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
        matchesCategory && matchesSearch
      );
    });
  }, [menus, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-[#FAFAFA] overflow-x-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-orange-100 rounded-full blur-[120px] opacity-60" />

        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-green-100 rounded-full blur-[120px] opacity-60" />
      </div>

      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-12">

        {/* HEADER */}
        <div className="mb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-4">
            Jelajahi Rasa ✨
          </h1>

          <p className="text-gray-500 max-w-2xl mx-auto">
            Healthy bowl, fresh ingredient,
            dan energi baru setiap hari.
          </p>
        </div>

        {/* FILTER */}
        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-16 bg-white/70 backdrop-blur-sm border border-gray-100 rounded-[2rem] p-5">

          {/* CATEGORY */}
          <div className="flex flex-wrap gap-3">
            {KATEGORI.map((cat) => (
              <button
                key={cat}
                onClick={() =>
                  setSelectedCategory(cat)
                }
                className={`px-6 py-3 rounded-2xl font-bold transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-[#2D2424] text-white shadow-md"
                    : "bg-white text-gray-500 border border-gray-100 hover:border-orange-300"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* SEARCH */}
          <SearchBar
            value={searchQuery}
            onChange={setSearchQuery}
          />
        </div>

        {/* GRID */}
        {filteredMenu.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

            {filteredMenu.map((menu) => (
              <Link
                key={menu.id}
                href={`/menu/${menu.id}`}
              >
                <MenuCard menu={menu} />
              </Link>
            ))}

          </div>
        ) : (
          <div className="bg-white rounded-[2rem] p-16 text-center border border-gray-100">
            <h2 className="text-3xl font-black mb-3">
              Menu Tidak Ditemukan 😢
            </h2>

            <p className="text-gray-500">
              Coba kata kunci lain atau pilih
              kategori berbeda.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}