import { create } from 'zustand'
import { OrderRecord } from '@/types/order'

type OrderStore = {
  orders: OrderRecord[]
  loadOrders: () => void
  addOrder: (order: OrderRecord) => void
  clearOrders: () => void
}

const ORDER_KEY = 'rice_orders'

export const useOrderStore = create<OrderStore>((set) => ({
  orders: [],

  loadOrders: () => {
    if (typeof window === 'undefined') return

    try {
      const raw = localStorage.getItem(ORDER_KEY)
      const parsed = raw ? JSON.parse(raw) : []
      set({ orders: Array.isArray(parsed) ? parsed : [] })
    } catch {
      set({ orders: [] })
    }
  },

  addOrder: (order) =>
    set((state) => {
      const nextOrders = [order, ...state.orders]
      if (typeof window !== 'undefined') {
        localStorage.setItem(ORDER_KEY, JSON.stringify(nextOrders))
      }
      return { orders: nextOrders }
    }),

  clearOrders: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(ORDER_KEY)
    }
    set({ orders: [] })
  },
}))
