"use client"

import Link from 'next/link'
import { useEffect, useState } from 'react'

import { getStatusByProgress } from './orderStatus'

type OrderItem = {
  id: number
  title: string
  quantity: number
  price: number
}

type OrderRecord = {
  id: string
  createdAt: string
  paymentMethod: 'cash' | 'bank' | 'card'
  note: string
  address: string
  deliveryDate: string
  items: OrderItem[]
  totalPrice: number
  totalItems: number
  status: string
}


export default function OrdersPage() {
  const [orders, setOrders] = useState<OrderRecord[]>([])

  useEffect(() => {
    if (typeof window === 'undefined') return

    try {
      const raw = localStorage.getItem('rice_orders')
      const parsed = raw ? JSON.parse(raw) : []
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setOrders(Array.isArray(parsed) ? parsed : [])
    } catch {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      setOrders([])
    }
  }, [])


  const totalSpent = orders.reduce((sum, order) => sum + order.totalPrice, 0)

  // Render status simulation based on createdAt.
  const withComputedStatus = orders.map((order) => ({
    ...order,
    status: getStatusByProgress(order.createdAt),
  }))


  return (
    <main className="min-h-screen bg-[#F8F9FB] py-10">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between mb-8">
          <div>
            <p className="text-sm text-slate-500">Riwayat Pesanan</p>
            <h1 className="text-3xl font-extrabold text-slate-900">Pesanan Saya</h1>
            <p className="mt-2 text-slate-600 max-w-2xl">
              Semua pesanan yang telah dikonfirmasi akan muncul di sini.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link href="/menu" className="rounded-full border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-700 hover:bg-white">
              Tambah Menu
            </Link>
            <Link href="/cart" className="rounded-full bg-orange-500 px-5 py-3 text-sm font-semibold text-white hover:bg-orange-600">
              Lihat Keranjang
            </Link>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="rounded-4xl bg-white border border-slate-200 p-10 text-center shadow-sm">
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-orange-500">
              <svg viewBox="0 0 24 24" className="h-10 w-10" fill="currentColor">
                <path d="M3 3h18v2H3V3zm2 4h14v11H5V7zm2 2v7h10V9H7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 mb-3">Belum ada pesanan</h2>
            <p className="text-slate-500 mb-8">
              Setelah checkout, pesananmu akan muncul di halaman ini.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/menu" className="rounded-full bg-orange-500 px-6 py-3 text-white font-semibold hover:bg-orange-600">
                Beli Sekarang
              </Link>
              <Link href="/cart" className="rounded-full border border-slate-200 px-6 py-3 text-slate-700 hover:bg-slate-100">
                Periksa Keranjang
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid gap-6 lg:grid-cols-[2.2fr_1fr]">
            <section className="space-y-6">
              {withComputedStatus.map((order) => (

                <div key={order.id} className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <p className="text-sm text-slate-500">{new Date(order.createdAt).toLocaleString('id-ID', {
                        day: '2-digit',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                      })}</p>
                      <h2 className="text-2xl font-semibold text-slate-900">Order {order.id.replace('ORD-', '')}</h2>
                    </div>
                    <span
                      className={`inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                        order.status === 'Selesai'
                          ? 'bg-emerald-100 text-emerald-700'
                          : order.status === 'Dikirim'
                          ? 'bg-blue-100 text-blue-700'
                          : order.status === 'Dikemas'
                          ? 'bg-amber-100 text-amber-700'
                          : 'bg-slate-100 text-slate-700'
                      }`}
                    >
                      {order.status}
                    </span>

                  </div>

                  <div className="mt-5 grid gap-4 md:grid-cols-2">
                    <div className="rounded-3xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">Metode Pembayaran</p>
                      <p className="mt-2 font-semibold text-slate-900 capitalize">{order.paymentMethod.replace('cash', 'Cash').replace('bank', 'Bank Transfer').replace('card', 'Kartu / Online')}</p>
                    </div>
                    <div className="rounded-3xl bg-slate-50 p-4">
                      <p className="text-sm text-slate-500">Total Pesanan</p>
                      <p className="mt-2 text-xl font-bold text-orange-500">Rp {new Intl.NumberFormat('id-ID').format(order.totalPrice)}</p>
                    </div>

                    <div className="rounded-3xl bg-slate-50 p-4 md:col-span-2">
                      <p className="text-sm text-slate-500">Alamat & Tanggal</p>
                      <p className="mt-2 font-semibold text-slate-900">{order.address}</p>
                      <p className="mt-1 text-sm text-slate-600">Tanggal: {order.deliveryDate}</p>
                    </div>

                  </div>

                  <div className="mt-6 border-t border-slate-200 pt-5">
                    <h3 className="text-lg font-semibold text-slate-900">Menu dalam pesanan</h3>
                    <div className="mt-4 space-y-3">
                      {order.items.map((item) => (
                        <div key={item.id} className="flex items-center justify-between rounded-3xl bg-white p-4 border border-slate-100">
                          <div>
                            <p className="font-semibold text-slate-900">{item.title}</p>
                            <p className="text-sm text-slate-500">x{item.quantity} • Rp {new Intl.NumberFormat('id-ID').format(item.price)}</p>
                          </div>
                          <p className="font-semibold text-slate-900">Rp {new Intl.NumberFormat('id-ID').format(item.price * item.quantity)}</p>
                        </div>
                      ))}
                    </div>

                    {order.note && (
                      <div className="mt-4 rounded-3xl bg-slate-50 p-4 text-sm text-slate-700">
                        <p className="font-medium text-slate-900">Catatan</p>
                        <p className="mt-2">{order.note}</p>
                      </div>
                    )}

                    {/* Simulasi langkah proses sesuai flow diagram (tanpa admin/DB). */}
                    <div className="mt-4 rounded-3xl bg-white p-4 border border-slate-100">
                      <p className="text-sm text-slate-500">Alur Proses</p>
                      <ol className="mt-2 space-y-2 text-sm text-slate-700">
                        <li>
                          • Menunggu konfirmasi{' '}
                          {order.status === 'Menunggu konfirmasi' && (
                            <span className="text-orange-600 font-semibold">(aktif)</span>
                          )}
                        </li>
                        <li>
                          • Dikemas{' '}
                          {order.status === 'Dikemas' && (
                            <span className="text-orange-600 font-semibold">(aktif)</span>
                          )}
                        </li>
                        <li>
                          • Dikirim{' '}
                          {order.status === 'Dikirim' && (
                            <span className="text-orange-600 font-semibold">(aktif)</span>
                          )}
                        </li>
                        <li>
                          • Selesai{' '}
                          {order.status === 'Selesai' && (
                            <span className="text-emerald-600 font-semibold">(aktif)</span>
                          )}
                        </li>
                      </ol>
                    </div>

                  </div>
                </div>
              ))}
            </section>

            <aside className="space-y-6">
              <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-sm text-slate-500">Ringkasan</p>
                <h2 className="mt-3 text-3xl font-bold text-slate-900">{orders.length} Pesanan</h2>
                <p className="mt-2 text-slate-500">Total pengeluaran terakhir kamu</p>

                <div className="mt-6 rounded-3xl bg-slate-50 p-5">
                  <p className="text-sm text-slate-500">Total Belanja</p>
                  <p className="mt-2 text-3xl font-bold text-orange-500">Rp {new Intl.NumberFormat('id-ID').format(totalSpent)}</p>
                </div>
              </div>

              <div className="rounded-4xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700">
                <h3 className="font-semibold text-slate-900">Catatan</h3>
                <ul className="mt-4 space-y-3">
                  <li>• Pesanan baru akan ditambahkan setelah checkout.</li>
                  <li>• Gunakan tombol Lihat Keranjang jika ingin menambah atau ubah pesanan.</li>
                  <li>• Saat ini riwayat disimpan sementara di browser.</li>
                </ul>
              </div>
            </aside>
          </div>
        )}
      </div>
    </main>
  )
}
