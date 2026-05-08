"use client";

import Image from "next/image";
import Link from "next/link";

import { motion } from "framer-motion";

import {
  ArrowLeft,
  ShoppingBag,
} from "lucide-react";

import { Menu } from "@/types/menu";

export default function DetailClient({
  menu,
}: {
  menu: Menu;
}) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID").format(price);

  return (
    <div className="min-h-screen bg-[#FAFAFA] overflow-hidden">

      {/* BACKGROUND */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-orange-100 rounded-full blur-[120px] opacity-60" />

        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-green-100 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* BACK */}
        <Link
          href="/menu"
          className="inline-flex items-center gap-3 mb-10 text-gray-500 hover:text-black transition-all"
        >
          <ArrowLeft size={18} />
          Kembali ke Menu
        </Link>

        <motion.div
          layoutId={`card-${menu.id}`}
          className="grid lg:grid-cols-2 gap-10 items-center"
        >

          {/* IMAGE */}
          <motion.div
            layoutId={`image-${menu.id}`}
            className="relative h-[500px] lg:h-[700px] rounded-[3rem] overflow-hidden shadow-xl"
          >
            <Image
              src={menu.image}
              alt={menu.title}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* CONTENT */}
          <div>

            <p className="text-orange-500 font-bold mb-4 uppercase tracking-wider">
              {menu.category}
            </p>

            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
              {menu.title}
            </h1>

            <p className="text-gray-500 text-lg leading-relaxed mb-10">
              {menu.description}
            </p>

            <div className="flex items-center gap-6 mb-10">

              <h2 className="text-5xl font-black">
                Rp{formatPrice(menu.price)}
              </h2>

              <div className="bg-orange-100 text-orange-500 px-4 py-2 rounded-full font-bold">
                ⭐ 4.9
              </div>
            </div>

            <button className="flex items-center gap-3 bg-[#2D2424] text-white px-10 py-5 rounded-3xl font-bold hover:bg-orange-500 transition-all text-lg shadow-lg">
              <ShoppingBag size={22} />

              Tambah ke Keranjang
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}