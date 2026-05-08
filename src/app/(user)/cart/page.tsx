"use client";

import Image from "next/image";

import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const cart = useCartStore((state) => state.cart);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const formatPrice = (price: number) =>
    new Intl.NumberFormat("id-ID").format(price);

  return (
    <div className="min-h-screen bg-[#FAFAFA] p-6">
      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl font-black mb-10">
          Keranjang 🛒
        </h1>

        <div className="space-y-6">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white p-5 rounded-3xl flex items-center justify-between"
            >
              <div className="flex items-center gap-5">

                <div className="relative w-24 h-24 rounded-2xl overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>

                <div>
                  <h2 className="text-2xl font-black">
                    {item.title}
                  </h2>

                  <p className="text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>
              </div>

              <h3 className="text-2xl font-black">
                Rp
                {formatPrice(
                  item.price * item.quantity
                )}
              </h3>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-white p-8 rounded-3xl">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-black">
              Total
            </h2>

            <h2 className="text-3xl font-black text-orange-500">
              Rp{formatPrice(totalPrice)}
            </h2>
          </div>

          <button className="w-full bg-[#2D2424] text-white py-5 rounded-2xl font-bold hover:bg-orange-500 transition-all">
            Checkout 🚀
          </button>
        </div>
      </div>
    </div>
  );
}