import { create } from "zustand";

import { Menu } from "@/types/menu";

type CartItem = Menu & {
  quantity: number;
};

type CartStore = {
  cart: CartItem[];

  addToCart: (menu: Menu) => void;

  removeFromCart: (id: number) => void;

  clearCart: () => void;
};

export const useCartStore =
  create<CartStore>((set) => ({
    cart: [],

    addToCart: (menu) =>
      set((state) => {
        const existing =
          state.cart.find(
            (item) => item.id === menu.id
          );

        if (existing) {
          return {
            cart: state.cart.map((item) =>
              item.id === menu.id
                ? {
                    ...item,
                    quantity:
                      item.quantity + 1,
                  }
                : item
            ),
          };
        }

        return {
          cart: [
            ...state.cart,
            {
              ...menu,
              quantity: 1,
            },
          ],
        };
      }),

    removeFromCart: (id) =>
      set((state) => ({
        cart: state.cart.filter(
          (item) => item.id !== id
        ),
      })),

    clearCart: () =>
      set({
        cart: [],
      }),
  }));