"use client";

import Image from "next/image";
import { useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Star, ShoppingBag, Leaf, Flame, Sparkles } from "lucide-react";

import { Menu } from "@/types/menu";

type Props = {
  isOpen: boolean;
  menu: Menu | null;
  onClose: () => void;
  onAddToCart: (menu: Menu) => void;
  isAddDisabled?: boolean;
};

export default function MenuFullScreenModal({
  isOpen,
  menu,
  onClose,
  onAddToCart,
  isAddDisabled,
}: Props) {
  const formatPrice = useMemo(
    () =>
      (price: number) =>
        new Intl.NumberFormat("id-ID").format(price),
    []
  );

  return (
    <AnimatePresence>
      {isOpen && menu && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/55 z-50"
          />

          {/* Fullscreen modal */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ type: "spring", damping: 22, stiffness: 300 }}
            className="fixed inset-0 z-50 overflow-y-auto"
          >
            <div className="min-h-screen bg-[#FAFAFA]">

              {/* Top bar */}
              <div className="sticky top-0 z-10 bg-[#FAFAFA]/80 backdrop-blur-xl border-b border-slate-200">
                <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="p-2 rounded-full hover:bg-slate-100 active:scale-95 transition"
                      aria-label="Close"
                    >
                      <X size={20} className="text-slate-700" />
                    </button>

                    <div>
                      <p className="text-xs uppercase tracking-[0.26em] text-slate-400 font-bold">
                        {menu.category}
                      </p>
                      <p className="font-black text-lg text-slate-900 line-clamp-1">
                        {menu.title}
                      </p>
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-2">
                    <div className="inline-flex items-center gap-2 bg-white/70 border border-slate-200 rounded-full px-4 py-2 shadow-sm">
                      <Star size={14} className="fill-amber-400 text-amber-400" />
                      <span className="font-bold text-slate-800">
                        {menu.rating?.toFixed(1) ?? "4.9"}
                      </span>
                      <span className="text-slate-500 text-sm">(rating)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero */}
              <div className="max-w-7xl mx-auto px-4 md:px-6 pt-8 pb-14">
                <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-start">
                  <motion.div
                    layout
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.25 }}
                    className="relative h-[420px] sm:h-[520px] lg:h-[650px] rounded-[3rem] overflow-hidden shadow-xl border border-slate-200 bg-white"
                  >
                    <Image
                      src={menu.image}
                      alt={menu.title}
                      fill
                      className="object-cover"
                      priority
                    />
                    <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-slate-950/55 to-transparent" />

                    <div className="absolute top-6 left-6">
                      <span className="inline-flex items-center gap-2 rounded-full bg-white/90 border border-slate-200 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-slate-700 shadow-sm">
                        <Sparkles size={14} className="text-orange-500" />
                        Best Seller
                      </span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6">
                      <div className="bg-white/85 backdrop-blur-xl border border-slate-200 rounded-3xl px-5 py-4">
                        <p className="text-[11px] uppercase tracking-[0.25em] text-slate-400 font-bold">
                          Harga / porsi
                        </p>
                        <p className="text-3xl font-black text-slate-900">
                          Rp{formatPrice(menu.price)}
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Content */}
                  <div className="pt-2">
                    <div className="flex items-center gap-3 mb-4 sm:hidden">

                      <span className="inline-flex items-center gap-2 bg-white/70 border border-slate-200 rounded-full px-3 py-1.5 text-sm font-bold text-slate-800">
                        <Star size={14} className="fill-amber-400 text-amber-400" />
                        {menu.rating?.toFixed(1) ?? "4.9"}
                      </span>
                      <span className="text-xs text-slate-500">rating</span>
                    </div>

                    <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-4">
                      {menu.title}
                    </h1>

                    <p className="text-slate-600 text-base md:text-lg leading-relaxed mb-8">
                      {menu.description}
                    </p>

                    {/* Tambahan section biar ga kosong */}
                    <div className="grid sm:grid-cols-2 gap-4 mb-8">
                      <div className="rounded-3xl border border-slate-200 bg-white p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-orange-50 flex items-center justify-center">
                            <Leaf size={18} className="text-orange-500" />
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-[0.22em] text-slate-400 font-bold">
                              Fresh & Seimbang
                            </p>
                            <p className="font-bold text-slate-800 mt-1">
                              Bahan berkualitas
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="rounded-3xl border border-slate-200 bg-white p-4">
                        <div className="flex items-start gap-3">
                          <div className="w-10 h-10 rounded-2xl bg-amber-50 flex items-center justify-center">
                            <Flame size={18} className="text-amber-600" />
                          </div>
                          <div>
                            <p className="text-xs uppercase tracking-[0.22em] text-slate-400 font-bold">
                              Rasa Dominan
                            </p>
                            <p className="font-bold text-slate-800 mt-1">
                              Umami & gurih
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="rounded-[2.25rem] border border-slate-200 bg-white p-6 mb-8">
                      <p className="text-xs uppercase tracking-[0.25em] text-slate-400 font-bold mb-3">
                        Cocok untuk
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="rounded-full bg-slate-50 border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                          Meeting
                        </span>
                        <span className="rounded-full bg-slate-50 border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                          Event perusahaan
                        </span>
                        <span className="rounded-full bg-slate-50 border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                          Pesta privat
                        </span>
                        <span className="rounded-full bg-slate-50 border border-slate-200 px-3 py-1 text-xs font-semibold text-slate-600">
                          Catering harian
                        </span>
                      </div>
                    </div>

                    {/* Add to cart */}
                    <button
                      type="button"
                      onClick={() => onAddToCart(menu)}
                      disabled={isAddDisabled}
                      className="w-full flex items-center justify-center gap-3 bg-[#2D2424] text-white px-6 py-4 rounded-3xl font-bold hover:bg-orange-500 transition-all text-lg shadow-lg disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                      <ShoppingBag size={22} />
                      Tambah ke Keranjang
                    </button>

                    <p className="text-center text-xs text-slate-500 mt-4">
                      Tip: Kamu bisa checkout setelah login.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

