"use client";

import Image from "next/image";
import { useState } from "react";
import { useSession } from "next-auth/react";

import { motion } from "framer-motion";

import {
  ShoppingBag,
  Star,
} from "lucide-react";

import { useRouter } from "next/navigation";

import { Menu } from "@/types/menu";

import { useCartStore } from "@/store/cartStore";
import LoginModal from "./LoginModal";

export default function MenuCard({
  menu,
}: {
  menu: Menu;
}) {
  const router = useRouter();
  const session = useSession()?.data;
  const [showLoginModal, setShowLoginModal] = useState(false);

  const addToCart =
    useCartStore(
      (state) => state.addToCart
    );

  const formatPrice = (
    price: number
  ) =>
    new Intl.NumberFormat(
      "id-ID"
    ).format(price);

  const handleAddToCart = () => {
    // Check if user is logged in
    if (!session?.user) {
      setShowLoginModal(true);
      return;
    }

    // If logged in, add to cart
    addToCart(menu);
  };

  return (
    <motion.div
      whileHover={{
        y: -6,
      }}
      transition={{
        type: "spring",
        stiffness: 120,
        damping: 15,
      }}
      className="bg-white rounded-[2rem] p-3 sm:p-5 shadow-sm border border-gray-100 hover:shadow-xl transition-all"
    >
      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />

      {/* CLICKABLE */}
      <div
        onClick={() =>
          router.push(
            `/menu/${menu.id}`
          )
        }
        className="cursor-pointer"
      >

        {/* IMAGE */}
        <div className="relative aspect-[4/5] rounded-[1.5rem] overflow-hidden mb-4">

          <Image
            src={menu.image}
            alt={menu.title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-500"
          />

          {/* RATING */}
          <div className="absolute top-3 right-3 bg-black/70 backdrop-blur-md text-amber-300 px-2.5 py-1 rounded-full text-[10px] sm:text-xs font-bold flex items-center gap-1">

            <Star
              size={12}
              className="fill-amber-300"
            />

            4.9
          </div>
        </div>

        {/* CONTENT */}
        <div className="px-1">

          <p className="text-orange-500 text-[10px] sm:text-xs font-bold uppercase tracking-widest mb-1">
            {menu.category}
          </p>

          <h3 className="text-lg sm:text-2xl font-black line-clamp-1 mb-2 leading-tight">
            {menu.title}
          </h3>

          <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mb-4">
            {menu.description}
          </p>
        </div>
      </div>

      {/* FOOTER */}
      <div className="px-1 flex items-center justify-between">

        <div>
          <p className="text-[10px] text-gray-400 uppercase font-bold tracking-wider">
            Harga
          </p>

          <h4 className="text-lg sm:text-2xl font-black">
            Rp
            {formatPrice(
              menu.price
            )}
          </h4>
        </div>

        {/* CART */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            handleAddToCart();
          }}
          className="bg-[#2D2424] text-white p-3 sm:p-4 rounded-2xl hover:bg-orange-500 transition-all active:scale-95 shadow-lg"
        >

          <ShoppingBag
            size={18}
          />
        </button>
      </div>
    </motion.div>
  );
}