// src/app/HomeClient.tsx

"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { motion } from "framer-motion";

import {
  Utensils,
  Sun,
  ShoppingBag,
  Leaf,
  ArrowRight,
  Star,
} from "lucide-react";

import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import { Menu } from "@/types/menu";
import { useCartStore } from "@/store/cartStore";
import LoginModal from "@/components/LoginModal";

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export default function HomeClient({
  menus,
}: {
  menus: Menu[];
}) {
  const session = useSession()?.data;
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { addToCart: addToCartStore } = useCartStore();

  const handleAddToCart = (menu: Menu) => {
    // Check if user is logged in
    if (!session?.user) {
      setShowLoginModal(true);
      return;
    }

    // If logged in, add to cart
    addToCartStore(menu);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] font-sans text-[#2D2424] overflow-x-hidden">
      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
      
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-5%] right-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-orange-100 rounded-full blur-[80px] md:blur-[120px] opacity-60" />
        <div className="absolute bottom-[-5%] left-[-10%] w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-green-100 rounded-full blur-[80px] md:blur-[120px] opacity-60" />
      </div>

      {/* NAVBAR */}
      <nav className="relative z-50 flex items-center justify-between px-5 md:px-10 py-5 md:py-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-2 md:gap-3">
          <div className="bg-gradient-to-tr from-amber-400 to-orange-500 p-2.5 md:p-3 rounded-xl md:rounded-2xl shadow-lg shadow-orange-200">
            <Sun size={20} className="text-white" />
          </div>
          <span className="text-xl md:text-2xl font-black tracking-tight">
            RICE<span className="text-orange-500">&</span>SHINE
          </span>
        </div>

      <div className="flex items-center gap-4 md:gap-10">
          <div className="hidden lg:flex items-center gap-10 font-bold text-[13px] uppercase tracking-widest text-gray-500">
            <Link href="/menu" className="hover:text-orange-500 transition-all">Menu</Link>
            <a href="#" className="hover:text-orange-500 transition-all">About</a>
          </div>

          <Link
            href="/cart"
            className="relative bg-white p-3 rounded-xl md:rounded-2xl shadow-sm border border-gray-100 active:scale-95 transition-transform"
          >
            <ShoppingBag size={20} className="text-gray-700" />
          </Link>
        </div>
      </nav>

      {/* HERO SECTION */}
      <main className="relative z-10 max-w-7xl mx-auto px-5 md:px-10 py-8 md:py-16 grid lg:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center lg:text-left"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-600 px-4 py-2 rounded-full mb-6 font-bold text-xs md:text-sm border border-emerald-100 shadow-sm">
            <Leaf size={14} className="fill-emerald-600" />
            Premium Organic Catering
          </div>

          <h1 className="text-[2.8rem] sm:text-6xl md:text-8xl font-black leading-[1] mb-6 tracking-tighter uppercase">
            MAKANAN
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500">
              FAVORITMU.
            </span>
          </h1>

          <p className="text-sm md:text-xl text-gray-500 mb-8 md:mb-10 max-w-md mx-auto lg:mx-0 leading-relaxed font-medium">
            Nikmati menu sehat dan lezat pilihan terbaik dengan bahan premium yang fresh setiap hari ✨
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Link href="/menu" className="w-full sm:w-auto">
              <button className="w-full group bg-[#2D2424] text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl md:rounded-[2rem] font-bold text-lg flex items-center justify-center gap-3 hover:bg-orange-500 transition-all shadow-xl shadow-orange-100">
                Cek Menu
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <button className="font-bold text-gray-400 hover:text-orange-500 transition-colors py-2 px-4">
              Lihat Promo
            </button>
          </div>

          <div className="flex justify-center lg:justify-start gap-8 mt-12 border-t border-gray-100 pt-8">
            <div>
              <h3 className="text-3xl md:text-4xl font-black">{menus.length}+</h3>
              <p className="text-gray-400 font-bold text-[10px] md:text-xs uppercase tracking-widest">Menu Fresh</p>
            </div>
            <div>
              <h3 className="text-3xl md:text-4xl font-black">4.9</h3>
              <p className="text-gray-400 font-bold text-[10px] md:text-xs uppercase tracking-widest">Rating</p>
            </div>
          </div>
        </motion.div>

        {/* RIGHT CONTENT (Featured Card) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative px-2 md:px-0"
        >
          <div className="relative bg-white rounded-[2.5rem] md:rounded-[3.5rem] p-3 md:p-4 shadow-2xl border border-gray-50 overflow-hidden">
            <div className="relative h-[350px] md:h-[550px] rounded-[2rem] md:rounded-[3rem] overflow-hidden">
              <Image
                src={menus[0]?.image || "/images/placeholder.jpg"}
                alt={menus[0]?.title || "Menu"}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-md px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                {menus[0]?.category}
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 text-white">
                <h3 className="text-3xl md:text-5xl font-black leading-tight mb-3">
                  {menus[0]?.title}
                </h3>
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-widest text-white/60 font-bold">Harga</p>
                    <h4 className="text-2xl md:text-4xl font-black">Rp{menus[0]?.price}</h4>
                  </div>
                  <button
                    onClick={() => menus[0] && handleAddToCart(menus[0])}
                    className="bg-orange-500 hover:bg-orange-400 text-white p-4 md:p-5 rounded-2xl md:rounded-3xl transition-all shadow-xl active:scale-95"
                  >
                    <ShoppingBag size={24} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Floating Best Seller Badge (Mobile Friendly) */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute -bottom-6 left-1/2 -translate-x-1/2 lg:left-[-30px] lg:translate-x-0 bg-white p-3 md:p-4 rounded-2xl md:rounded-3xl shadow-2xl border border-gray-50 flex items-center gap-3 md:gap-4 whitespace-nowrap"
          >
            <div className="bg-orange-100 p-2 md:p-3 rounded-xl">
              <Utensils className="text-orange-500" size={20} />
            </div>
            <div>
              <p className="text-[9px] md:text-xs text-gray-400 font-bold uppercase tracking-wider">Best Seller</p>
              <h4 className="text-sm md:text-lg font-black">{menus[1]?.title || "Healthy Bowl"}</h4>
            </div>
          </motion.div>
        </motion.div>
      </main>

      {/* MENU LIST SECTION */}
      <section className="relative z-10 bg-white py-20 px-5 md:px-10 rounded-t-[3rem] md:rounded-t-[5rem] shadow-[0_-20px_50px_-20px_rgba(0,0,0,0.1)]">
        <div className="max-w-7xl mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <p className="text-orange-500 font-black text-xs md:text-sm uppercase tracking-[0.2em] mb-2">Pilihan Terbaik Untukmu</p>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-[0.9]">
                Jelajahi <span className="text-gray-300">Rasa Baru ✨</span>
              </h2>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
            {menus.map((menu) => (
              <motion.div
                key={menu.id}
                whileHover={{ y: -8 }}
                className="group bg-white p-4 md:p-5 rounded-[2rem] md:rounded-[3rem] shadow-sm hover:shadow-2xl hover:shadow-orange-100/30 transition-all border border-gray-100"
              >
                <div className={cn("relative h-64 md:h-80 rounded-[1.8rem] md:rounded-[2.5rem] mb-6 overflow-hidden", menu.color)}>
                  <Image src={menu.image} alt={menu.title} fill className="object-cover group-hover:scale-110 transition-transform duration-700" />
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest">
                    {menu.category}
                  </div>
                  <div className="absolute top-4 right-4 bg-[#2D2424]/80 text-amber-300 px-3 py-1 rounded-full text-[10px] font-black flex items-center gap-1.5">
                    <Star size={12} className="fill-amber-300" />
                    {menu.rating}
                  </div>
                </div>

                <div className="px-2 pb-2">
                  <h4 className="text-2xl md:text-3xl font-black text-[#2D2424] leading-tight group-hover:text-orange-600 transition-colors">
                    {menu.title}
                  </h4>
                  <p className="text-gray-400 text-xs md:text-sm font-medium mt-2 mb-6 line-clamp-2">
                    {menu.description}
                  </p>

                  <div className="flex items-center justify-between pt-5 border-t border-gray-50">
                    <div>
                      <span className="text-[9px] font-bold text-gray-300 uppercase tracking-widest">Harga</span>
                      <p className="text-xl md:text-2xl font-black text-[#2D2424]">Rp{menu.price}</p>
                    </div>
                    <button
                      onClick={() => handleAddToCart(menu)}
                      className="bg-[#2D2424] text-white p-3.5 md:p-4 rounded-xl md:rounded-2xl hover:bg-orange-500 transition-all shadow-lg active:scale-90"
                    >
                      <ShoppingBag size={20} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link href="/menu" className="inline-flex items-center gap-3 font-black text-xs md:text-sm text-gray-400 hover:text-[#2D2424] transition-all group tracking-widest uppercase">
              Lihat Semua Menu
              <div className="bg-gray-100 p-2 rounded-full group-hover:translate-x-2 transition-transform">
                <ArrowRight size={16} />
              </div>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}