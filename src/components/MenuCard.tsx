"use client";

import Image from "next/image";

import { motion } from "framer-motion";

import { ShoppingBag, Star } from "lucide-react";

import { Menu } from "@/types/menu";

export default function MenuCard({
  menu,
}: {
  menu: Menu;
}) {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID").format(price);

  return (
    <motion.div
      layoutId={`card-${menu.id}`}
      whileHover={{
        y: -10,
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 15,
      }}
      className="bg-white rounded-[2.5rem] p-5 shadow-sm border border-gray-100 cursor-pointer"
    >

      {/* IMAGE */}
      <motion.div
        layoutId={`image-${menu.id}`}
        className="relative h-64 rounded-[2rem] overflow-hidden mb-6"
      >
        <Image
          src={menu.image}
          alt={menu.title}
          fill
          className="object-cover"
        />

        {/* RATING */}
        <div className="absolute top-4 right-4 bg-black/70 text-amber-300 px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
          <Star
            size={13}
            className="fill-amber-300"
          />

          4.9
        </div>
      </motion.div>

      {/* CONTENT */}
      <div className="px-2">

        <p className="text-orange-500 text-sm font-bold uppercase tracking-wider mb-2">
          {menu.category}
        </p>

        <h3 className="text-2xl font-black mb-3">
          {menu.title}
        </h3>

        <p className="text-gray-500 text-sm mb-6 line-clamp-2">
          {menu.description}
        </p>

        <div className="flex items-center justify-between">

          <div>
            <p className="text-xs text-gray-400 uppercase">
              Harga
            </p>

            <h4 className="text-2xl font-black">
              Rp{formatPrice(menu.price)}
            </h4>
          </div>

          <button className="bg-[#2D2424] text-white p-4 rounded-2xl hover:bg-orange-500 transition-all">
            <ShoppingBag size={22} />
          </button>
        </div>
      </div>
    </motion.div>
  );
}