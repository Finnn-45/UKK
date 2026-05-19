export type PaymentMethod = 'cash' | 'bank' | 'card'

export type OrderItem = {
  id: number
  title: string
  price: number
  quantity: number
}

export type OrderStatus = 'Menunggu konfirmasi' | 'Dikemas' | 'Dikirim' | 'Selesai'

export type OrderRecord = {
  id: string
  createdAt: string
  paymentMethod: PaymentMethod
  note: string
  items: OrderItem[]
  totalPrice: number
  totalItems: number
  status: OrderStatus
}
