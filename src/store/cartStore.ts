import { create } from "zustand";
import { persist } from "zustand/middleware";

import { Menu } from "@/types/menu";

type CartItem = Menu & {
  quantity: number;
};

type CartStore = {
  cart: CartItem[];

  addToCart: (
    menu: Menu
  ) => void;

  increaseQty: (
    id: number
  ) => void;

  decreaseQty: (
    id: number
  ) => void;

  removeFromCart: (
    id: number
  ) => void;

  clearCart: () => void;
};

export const useCartStore =
  create<CartStore>()(
    persist(
      (set) => ({ 
        cart: [],

        // ADD
        addToCart: (menu) =>
          set((state) => {
            const existing =
              state.cart.find(
                (item) =>
                  item.id === menu.id
              );

            if (existing) {
              return {
                cart: state.cart.map(
                  (item) =>
                    item.id === menu.id
                      ? {
                          ...item,
                          quantity:
                            item.quantity +
                            1,
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

        // TAMBAH QTY
        increaseQty: (id) =>
          set((state) => ({
            cart: state.cart.map(
              (item) =>
                item.id === id
                  ? {
                      ...item,
                      quantity:
                        item.quantity +
                        1,
                    }
                  : item
            ),
          })),

        // KURANG QTY
        decreaseQty: (id) =>
          set((state) => ({
            cart: state.cart
              .map((item) =>
                item.id === id
                  ? {
                      ...item,
                      quantity:
                        item.quantity -
                        1,
                    }
                  : item
              )
              .filter(
                (item) =>
                  item.quantity > 0
              ),
          })),

        // REMOVE
        removeFromCart: (id) =>
          set((state) => ({
            cart: state.cart.filter(
              (item) =>
                item.id !== id
            ),
          })),

        // CLEAR
        clearCart: () =>
          set({
            cart: [],
          }),
      }),
      {
        name: "cart-storage", // localStorage key
      }
    )
  );