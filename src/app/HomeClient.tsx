// src/app/HomeClient.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";

import {
  Utensils,
  Sun,
  ShoppingBag,
  Leaf,
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Globe,
  MessageCircle,
  Share2,
  Star,
} from "lucide-react";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Menu } from "@/types/menu";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type CartItem = Menu & {
  qty: number;
};

export default function HomeClient({
  menus,
}: {
  menus: Menu[];
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");

    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  const addToCart = (menu: Menu) => {
    const existingItem = cart.find(
      (item) => item.id === menu.id
    );

    let updatedCart: CartItem[];

    if (existingItem) {
      updatedCart = cart.map((item) =>
        item.id === menu.id
          ? {
            ...item,
            qty: item.qty + 1,
          }
          : item
      );
    } else {
      updatedCart = [
        ...cart,
        {
          ...menu,
          qty: 1,
        },
      ];
    }

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-[#2D2424] overflow-x-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-orange-100 rounded-full blur-[100px] opacity-60" />

        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-green-100 rounded-full blur-[100px] opacity-60" />
      </div>

      {/* NAVBAR */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-10 py-6 max-w-7xl mx-auto">

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

        <div className="flex items-center gap-10">

          <div className="hidden lg:flex items-center gap-10 font-bold text-[13px] uppercase tracking-widest">
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

          <Link href="/cart">
            <button className="relative bg-white p-3 rounded-2xl shadow-sm border border-gray-100">
              <ShoppingBag
                size={20}
                className="text-gray-700"
              />

              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white font-bold">
                {cart.reduce(
                  (total, item) => total + item.qty,
                  0
                )}
              </span>
            </button>
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <main className="relative z-10 max-w-7xl mx-auto px-6 md:px-10 py-16 grid lg:grid-cols-2 gap-16 items-center">

        {/* LEFT */}
        <div>

          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-5 py-2 rounded-full mb-8 font-bold text-sm border border-emerald-100">
            <Leaf
              size={14}
              className="fill-emerald-600"
            />

            Premium Organic Catering
          </div>

          <h1 className="text-6xl md:text-8xl font-black leading-[0.9] mb-8 tracking-tighter">
            ENERGI
            <br />

            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500">
              SETIAP HARI.
            </span>
          </h1>

          <p className="text-xl text-gray-500 mb-10 max-w-md leading-relaxed font-medium">
            Lezatnya masakan rumah dengan kualitas
            bahan organik terbaik untuk harimu.
          </p>

          <div className="flex items-center gap-5">

            <Link href="/menu">
              <button className="bg-[#2D2424] text-white px-10 py-5 rounded-[2rem] font-bold text-lg flex items-center gap-3 hover:bg-orange-500 transition-all">
                Cek Menu

                <ArrowRight size={20} />
              </button>
            </Link>

            <button className="font-bold text-gray-500 hover:text-orange-500 transition-colors">
              Lihat Promo
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="relative grid grid-cols-12 gap-4 h-[500px]">

          <div className="col-span-8 row-span-2 bg-amber-100 rounded-[3rem] p-8 flex flex-col justify-between border-4 border-white shadow-2xl shadow-orange-100 overflow-hidden">

            <div className="bg-white/50 backdrop-blur-md w-12 h-12 rounded-xl flex items-center justify-center">
              <Utensils
                className="text-orange-600"
                size={20}
              />
            </div>

            <div>
              <h3 className="text-3xl font-black">
                Bowl of Joy
              </h3>

              <p className="font-bold text-orange-600 text-xl">
                Organic Fresh Food
              </p>
            </div>
          </div>

          <div className="col-span-4 bg-emerald-500 rounded-[2.5rem] p-6 flex flex-col justify-between border-4 border-white shadow-xl shadow-emerald-100">

            <Leaf
              className="text-white/40"
              size={24}
            />

            <span className="text-white font-bold text-xl">
              Organic
            </span>
          </div>

          <div className="col-span-4 bg-[#2D2424] rounded-[2.5rem] p-6 flex items-center justify-center border-4 border-white shadow-xl">

            <div className="text-center">
              <p className="text-amber-400 font-black text-3xl">
                4.9
              </p>

              <p className="text-white/50 text-[10px] font-bold uppercase tracking-widest">
                Rating
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* MENU */}
      <section className="relative z-10 bg-white/80 backdrop-blur-3xl py-24 px-6 md:px-10 rounded-t-[4rem] shadow-2xl border-t border-white">

        <div className="max-w-7xl mx-auto">

          {/* HEADER */}
          <div className="flex items-end justify-between mb-16">

            <div>
              <p className="text-orange-500 font-black text-sm uppercase tracking-[0.3em] mb-2">
                Pilihan Terbaik Untukmu
              </p>

              <h2 className="text-6xl font-black tracking-tighter uppercase leading-none">
                Jelajahi
                <br />

                <span className="text-gray-400">
                  Rasa Baru ✨
                </span>
              </h2>
            </div>
          </div>

          {/* GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">

            {menus.map((menu) => (
              <motion.div
                key={menu.id}
                whileHover={{
                  y: -10,
                }}
                transition={{
                  type: "spring",
                  stiffness: 120,
                  damping: 15,
                }}
                className="group relative bg-white p-5 rounded-[3rem] shadow-sm hover:shadow-2xl hover:shadow-orange-100/50 transition-all border border-gray-100 cursor-pointer"
              >

                {/* IMAGE */}
                <div
                  className={cn(
                    "relative h-80 rounded-[2.5rem] mb-6 overflow-hidden",
                    menu.color
                  )}
                >

                  <Image
                    src={menu.image}
                    alt={menu.title}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest text-[#2D2424]">
                    {menu.category}
                  </div>

                  <div className="absolute top-5 right-5 bg-[#2D2424]/80 text-amber-300 px-3 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5">
                    <Star
                      size={14}
                      className="fill-amber-300"
                    />

                    {menu.rating}
                  </div>
                </div>

                {/* CONTENT */}
                <div className="px-3 pb-2">

                  <h4 className="text-3xl font-black text-[#2D2424] leading-tight group-hover:text-orange-600 transition-colors">
                    {menu.title}
                  </h4>

                  <p className="text-gray-400 text-sm font-medium mt-2 mb-6 line-clamp-2">
                    {menu.description}
                  </p>

                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-gray-50">

                    <div className="flex flex-col">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        Harga
                      </span>

                      <p className="text-2xl font-black text-[#2D2424]">
                        Rp{menu.price}
                      </p>
                    </div>

                    <button
                      onClick={() => addToCart(menu)}
                      className="bg-[#2D2424] text-white p-4 rounded-3xl hover:bg-orange-500 transition-all shadow-lg shadow-gray-200"
                    >
                      <ShoppingBag size={22} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* BUTTON */}
          <div className="mt-20 text-center">

            <Link
              href="/menu"
              className="inline-flex items-center gap-3 font-black text-gray-400 hover:text-[#2D2424] transition-all group"
            >
              LIHAT SEMUA MENU

              <div className="bg-gray-100 p-2 rounded-full group-hover:translate-x-2 transition-transform">
                <ArrowRight size={18} />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}