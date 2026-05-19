"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import { motion } from "framer-motion";

import {
  ArrowLeft,
  Minus,
  Plus,
  ShoppingBag,
  Trash2,
} from "lucide-react";

import { useCartStore } from "@/store/cartStore";
import LoginModal from "@/components/LoginModal";
import { useState } from "react";

export default function CartPage() {
  const router = useRouter();
  const session = useSession()?.data;
  const [showLoginModal, setShowLoginModal] = useState(false);

  const { cart, removeFromCart, increaseQty, decreaseQty } = useCartStore();

  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const formatPrice = (price: number) => new Intl.NumberFormat("id-ID").format(price);

  const handleCheckout = (e: React.MouseEvent) => {
    e.preventDefault();

    // Check if user is logged in
    if (!session?.user) {
      setShowLoginModal(true);
      return;
    }

    router.push("/checkout");
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] overflow-hidden">
      <LoginModal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} />

      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] bg-orange-100 rounded-full blur-[120px] opacity-60" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-green-100 rounded-full blur-[120px] opacity-60" />
      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-10 pb-40">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
          <div>
            <Link
              href="/menu"
              className="inline-flex items-center gap-2 text-gray-500 hover:text-orange-500 mb-5"
            >
              <ArrowLeft size={18} />
              Kembali ke Menu
            </Link>

            <h1 className="text-4xl md:text-7xl font-black tracking-tight">
              Keranjang<span className="text-orange-500">.</span>
            </h1>

            <p className="text-gray-500 mt-3 text-base md:text-lg">
              Menu pilihanmu siap untuk checkout 🚀
            </p>
          </div>

          <div className="hidden lg:block bg-white border border-gray-100 rounded-[2rem] p-6 shadow-sm w-[320px]">
            <div className="flex justify-between mb-3">
              <p className="text-gray-400">Total Item</p>
              <p className="font-black">{cart.reduce((a, i) => a + i.quantity, 0)}</p>
            </div>

            <div className="flex justify-between">
              <p className="text-gray-400">Total Harga</p>
              <p className="font-black text-orange-500">Rp{formatPrice(totalPrice)}</p>
            </div>
          </div>
        </div>

        {cart.length === 0 ? (
          <div className="bg-white rounded-[2.5rem] p-10 md:p-16 text-center border shadow-sm">
            <div className="bg-orange-100 w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag className="text-orange-500" />
            </div>

            <h2 className="text-2xl md:text-4xl font-black mb-3">Keranjang Kosong 😢</h2>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">Belum ada menu yang kamu tambahkan.</p>

            <Link href="/menu">
              <button className="bg-[#2D2424] text-white px-8 py-4 rounded-3xl font-bold hover:bg-orange-500 transition-all">
                Jelajahi Menu
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-5">
              {cart.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="bg-white rounded-[2rem] p-4 md:p-5 border shadow-sm"
                >
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="relative w-full md:w-40 h-48 md:h-40 rounded-2xl overflow-hidden">
                      <Image src={item.image} alt={item.title} fill className="object-cover" />
                    </div>

                    <div className="flex-1">
                      <p className="text-orange-500 text-xs font-bold uppercase mb-1">{item.category}</p>
                      <h2 className="text-xl md:text-2xl font-black mb-2">{item.title}</h2>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-4">{item.description}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 bg-gray-100 rounded-2xl p-2">
                          <button
                            onClick={() => decreaseQty(item.id)}
                            className="w-10 h-10 rounded-xl bg-white flex items-center justify-center active:scale-95"
                            type="button"
                          >
                            <Minus size={16} />
                          </button>

                          <span className="w-8 text-center font-black">{item.quantity}</span>

                          <button
                            onClick={() => increaseQty(item.id)}
                            className="w-10 h-10 rounded-xl bg-white flex items-center justify-center active:scale-95"
                            type="button"
                          >
                            <Plus size={16} />
                          </button>
                        </div>

                        <div className="text-right">
                          <p className="text-xs text-gray-400">Subtotal</p>
                          <p className="font-black text-lg">Rp{formatPrice(item.price * item.quantity)}</p>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="self-start md:self-center bg-red-50 text-red-500 p-3 rounded-xl active:scale-95"
                      type="button"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>

            <div className="hidden lg:block sticky top-10 h-fit">
              <div className="bg-white rounded-[2.5rem] p-8 shadow-xl border">
                <h2 className="text-3xl font-black mb-6">Ringkasan</h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between">
                    <p>Total Item</p>
                    <p className="font-bold">{cart.reduce((a, i) => a + i.quantity, 0)}</p>
                  </div>

                  <div className="flex justify-between">
                    <p>Ongkir</p>
                    <p className="text-green-500 font-bold">Gratis</p>
                  </div>

                  <div className="border-t pt-4 flex justify-between">
                    <p className="font-black">Total</p>
                    <p className="font-black text-orange-500">Rp{formatPrice(totalPrice)}</p>
                  </div>
                </div>

                <Link
                  href="/checkout"
                  onClick={handleCheckout}
                  className="w-full inline-flex items-center justify-center bg-[#2D2424] text-white py-4 rounded-2xl font-bold hover:bg-orange-500"
                >
                  Checkout 🚀
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      {cart.length > 0 && (
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-xl border-t p-4">
          <div className="flex items-center justify-between bg-[#2D2424] text-white rounded-2xl p-4">
            <div>
              <p className="text-xs opacity-60">Total</p>
              <p className="font-black text-lg">Rp{formatPrice(totalPrice)}</p>
            </div>

            <Link
              href="/checkout"
              onClick={handleCheckout}
              className="w-full inline-flex items-center justify-center bg-orange-500 px-5 py-3 rounded-xl font-bold text-white"
            >
              Checkout
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

