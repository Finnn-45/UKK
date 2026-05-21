"use client";

import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";

import { motion } from "framer-motion";
import { ShoppingBag, Star } from "lucide-react";

import { Menu } from "@/types/menu";
import { useCartStore } from "@/store/cartStore";

import LoginModal from "./LoginModal";
import MenuFullScreenModal from "./MenuFullScreenModal";

export default function MenuCard({ menu }: { menu: Menu }) {
  const session = useSession()?.data;

  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showMenuFullScreen, setShowMenuFullScreen] = useState(false);

  const addToCart = useCartStore((state) => state.addToCart);

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID").format(price);

  const handleAddToCart = () => {
    if (!session?.user) {
      setShowLoginModal(true);
      return;
    }
    addToCart(menu);
  };

  return (
    <>
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />

      <MenuFullScreenModal
        isOpen={showMenuFullScreen}
        menu={menu}
        onClose={() => setShowMenuFullScreen(false)}
        onAddToCart={(m) => {
          if (!session?.user) {
            setShowLoginModal(true);
            return;
          }
          addToCart(m);
          setShowMenuFullScreen(false);
        }}
      />

      <motion.div
        whileHover={{ y: -8 }}
        transition={{ type: "spring", stiffness: 120, damping: 16 }}
        className="group bg-white/95 border border-slate-200 shadow-[0_24px_60px_rgba(15,23,42,0.08)] rounded-[2rem] overflow-hidden hover:-translate-y-1 hover:shadow-2xl transition-all duration-300
        /* biar pas mobile card tidak kebesaran */
        max-w-[420px]"
      >
        <div
          onClick={() => setShowMenuFullScreen(true)}
          className="cursor-pointer"
        >
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src={menu.image}
              alt={menu.title}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <div className="absolute inset-x-0 top-0 h-20 bg-gradient-to-b from-slate-950/50 to-transparent" />

            <div className="absolute top-4 left-4 rounded-full bg-white/95 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-700 shadow-sm">
              {menu.category}
            </div>

            <div className="absolute top-4 right-4 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-bold text-amber-300 flex items-center gap-1 shadow-lg">
              <Star size={12} className="fill-amber-300" />
              {menu.rating?.toFixed(1) ?? "4.9"}
            </div>
          </div>

          <div className="px-5 pt-5 pb-3">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight line-clamp-2 mb-3">
              {menu.title}
            </h3>
            <p className="text-sm text-slate-500 leading-relaxed line-clamp-3 mb-5">
              {menu.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-4">
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Premium
              </span>
              <span className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-[11px] uppercase tracking-[0.2em] text-slate-500">
                Catering
              </span>
            </div>
          </div>
        </div>

        <div className="px-5 pb-5 pt-2 flex items-center justify-between gap-4 border-t border-slate-200">
          <div>
            <p className="text-[10px] uppercase tracking-[0.25em] text-slate-400 font-semibold mb-1">
              Harga / porsi
            </p>
            <p className="text-xl font-black text-slate-900">
              Rp{formatPrice(menu.price)}
            </p>
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
            className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-slate-950 text-white shadow-lg transition-colors duration-300 hover:bg-orange-500 active:scale-95"
            type="button"
          >
            <ShoppingBag size={20} />
          </button>
        </div>
      </motion.div>
    </>
  );
}

