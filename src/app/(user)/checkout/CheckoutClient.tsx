"use client"

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FormEvent, useState } from 'react'
import { useCartStore } from '@/store/cartStore'

type OrderItem = {
  id: number
  title: string
  price: number
  quantity: number
}

type OrderRecord = {
  id: string
  createdAt: string
  paymentMethod: 'cash' | 'bank' | 'card'
  note: string
  items: OrderItem[]
  totalPrice: number
  totalItems: number
  status: string
}

export default function CheckoutClient() {
  const router = useRouter()
  const { cart, clearCart } = useCartStore()
  const [method, setMethod] = useState<'cash' | 'bank' | 'card'>('cash')
  const [note, setNote] = useState('')
  const [processing, setProcessing] = useState(false)

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0)
  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0)

  function formatPrice(value: number) {
    return new Intl.NumberFormat('id-ID').format(value)
  }

  async function handleConfirm(e: FormEvent) {
    e.preventDefault()
    setProcessing(true)

    const order: OrderRecord = {
      id: `ORD-${Date.now()}`,
      createdAt: new Date().toISOString(),
      paymentMethod: method,
      note,
      items: cart.map((item) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
      })),
      totalPrice,
      totalItems,
      status: 'Menunggu konfirmasi',
    }

    await new Promise((resolve) => setTimeout(resolve, 600))

    const savedOrders = typeof window !== 'undefined' ? (() => {
      try {
        const raw = localStorage.getItem('rice_orders')
        const parsed = raw ? JSON.parse(raw) : []
        return Array.isArray(parsed) ? parsed : []
      } catch {
        return []
      }
    })() : []

    if (typeof window !== 'undefined') {
      localStorage.setItem('rice_orders', JSON.stringify([order, ...savedOrders]))
    }

    clearCart()
    setProcessing(false)
    router.push('/orders')
  }

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-[#F8F9FB] py-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-4xl bg-white border border-slate-200 p-10 text-center shadow-sm">
            <p className="text-sm uppercase text-slate-400 mb-4">Checkout</p>
            <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Keranjang Kosong</h1>
            <p className="text-slate-600 mb-8">
              Tambahkan menu dulu di keranjang agar bisa melanjutkan ke checkout.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/menu"
                className="rounded-full bg-orange-500 px-6 py-3 text-white font-semibold hover:bg-orange-600"
              >
                Jelajahi Menu
              </Link>
              <Link
                href="/cart"
                className="rounded-full border border-slate-200 px-6 py-3 text-slate-700 hover:bg-slate-100"
              >
                Kembali ke Keranjang
              </Link>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#F8F9FB] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <div>
            <p className="text-sm text-slate-500">Checkout</p>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Detail Pembayaran</h1>
            <p className="mt-2 text-slate-600 max-w-2xl">
              Pilih metode pembayaran dan lihat ringkasan pesananmu sebelum melanjutkan.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <Link href="/cart" className="px-4 py-2 rounded-full border border-slate-200 text-slate-700 hover:bg-white">
              Kembali ke Keranjang
            </Link>
            <Link href="/orders" className="px-4 py-2 rounded-full bg-orange-500 text-white hover:bg-orange-600">
              Lihat Pesanan Saya
            </Link>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1.7fr_1fr]">
          <section className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900">Metode Pembayaran</h2>
                  <p className="text-sm text-slate-500 mt-1">Pilih sesuai kenyamanan dan jenis pesananmu.</p>
                </div>
                <span className="text-sm text-slate-500">{totalItems} item</span>
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                {[
                  {
                    key: 'cash',
                    title: 'Cash on Delivery',
                    description: 'Bayar langsung saat pesanan tiba.',
                  },
                  {
                    key: 'bank',
                    title: 'Bank Transfer',
                    description: 'Transfer via BRI, lalu konfirmasi pembayaran.',
                  },
                  {
                    key: 'card',
                    title: 'Kartu / Online',
                    description: 'Bayar dengan kartu kredit/debit atau dompet digital.',
                  },
                ].map((option) => (
                  <button
                    key={option.key}
                    type="button"
                    onClick={() => setMethod(option.key as 'cash' | 'bank' | 'card')}
                    className={`rounded-3xl border p-4 text-left transition-all ${
                      method === option.key
                        ? 'border-orange-500 bg-orange-50 shadow-sm'
                        : 'border-slate-200 bg-white hover:border-slate-400'
                    }`}
                  >
                    <div className="text-base font-semibold text-slate-900">{option.title}</div>
                    <p className="text-sm text-slate-500 mt-2">{option.description}</p>
                  </button>
                ))}
              </div>

              {method === 'bank' && (
                <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="font-semibold text-slate-900">Instruksi Transfer</h3>
                  <div className="mt-3 space-y-2 text-sm text-slate-700">
                    <p>Bank: BRI</p>
                    <p>No. Rek: <strong>1234-5678-9012</strong></p>
                    <p>Atas Nama: <strong>Rice & Shine</strong></p>
                    <p className="text-slate-500">Simpan bukti transfer dan konfirmasi pembayaran setelah selesai.</p>
                  </div>
                </div>
              )}

              {method === 'card' && (
                <div className="mt-6 rounded-3xl border border-slate-200 bg-slate-50 p-5">
                  <h3 className="font-semibold text-slate-900">Pembayaran Kartu / Online</h3>
                  <p className="mt-3 text-sm text-slate-600">
                    Metode ini akan terhubung ke payment gateway saat integrasi selesai.
                  </p>
                </div>
              )}

              <form onSubmit={handleConfirm} className="mt-6 space-y-5">
                <div>
                  <label className="block text-sm font-medium text-slate-900">Catatan untuk penjual</label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={4}
                    placeholder="Contoh: nasi kurang garam, tanpa sambal..."
                    className="mt-3 w-full rounded-3xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-sm focus:border-orange-400 focus:outline-none"
                  />
                </div>

                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    disabled={processing}
                    className="inline-flex items-center justify-center rounded-3xl bg-orange-500 px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {processing ? 'Memproses...' : 'Konfirmasi dan Lanjutkan'}
                  </button>
                  {method === 'bank' && (
                    <button
                      type="button"
                      onClick={() => alert('Terima kasih — instruksi pembayaran telah dikirim.')}
                      className="rounded-3xl border border-slate-200 px-6 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
                    >
                      Saya sudah membayar
                    </button>
                  )}
                </div>
              </form>
            </div>
          </section>

          <aside className="space-y-6">
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold text-slate-900">Ringkasan Pesanan</h2>
              <div className="mt-5 space-y-4">
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Item</span>
                  <span>{totalItems} Produk</span>
                </div>
                <div className="flex items-center justify-between text-sm text-slate-500">
                  <span>Ongkos Kirim</span>
                  <span className="font-semibold text-slate-900">Gratis</span>
                </div>
                <div className="border-t border-slate-200 pt-4 flex items-center justify-between text-base font-semibold text-slate-900">
                  <span>Total Pembayaran</span>
                  <span>Rp {formatPrice(totalPrice)}</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700">
              <h3 className="font-semibold text-slate-900">Info Pembayaran</h3>
              <ul className="mt-4 space-y-3">
                <li>• Pilih metode yang paling mudah untukmu.</li>
                <li>• Pastikan catatan pesanan jelas jika butuh permintaan khusus.</li>
                <li>• Untuk transfer bank, simpan bukti pembayaran.</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
