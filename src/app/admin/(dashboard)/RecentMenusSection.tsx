import prisma from '@/lib/prisma'
import Link from 'next/link'
import { ArrowUpRight, Star, MoreVertical } from 'lucide-react'

export default async function RecentMenusSection() {
  // Data fetching hanya terjadi saat component ini di-render oleh Suspense
  const recentMenus = await prisma.menu.findMany({
    take: 5,
    orderBy: { createdAt: 'desc' },
    select: { id: true, title: true, category: true, price: true, rating: true }
  })

  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden">
      <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
        <div>
          <h3 className="font-bold text-slate-800 text-xl">Menu Terbaru</h3>
          <p className="text-sm text-slate-400 mt-1 font-medium">Update terakhir: Baru saja</p>
        </div>
        <Link href="/admin/menu" className="group flex items-center gap-1 text-indigo-600 text-sm font-bold bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-600 hover:text-white transition-colors duration-200">
          Lihat Semua
          <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Detail Menu</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Kategori</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest">Harga</th>
              <th className="px-8 py-5 text-xs font-bold text-slate-500 uppercase tracking-widest text-center">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {recentMenus.map((menu) => (
              <tr key={menu.id} className="hover:bg-slate-50/80 transition-colors group">
                <td className="px-8 py-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center font-bold text-slate-400 border border-slate-200">
                      {menu.title.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 leading-tight">{menu.title}</p>
                      <div className="flex items-center gap-1 mt-1 text-amber-500">
                        <Star size={12} fill="currentColor" />
                        <span className="text-xs font-bold">{menu.rating}</span>
                      </div>
                    </div>
                  </div>
                </td>
                <td className="px-8 py-6">
                  <span className="inline-flex items-center px-3 py-1 bg-white border border-slate-200 text-slate-600 rounded-full text-xs font-bold shadow-sm">
                    {menu.category}
                  </span>
                </td>
                <td className="px-8 py-6">
                  <p className="text-sm font-extrabold text-slate-900">
                    Rp {menu.price.toLocaleString('id-ID')}
                  </p>
                </td>
                <td className="px-8 py-6">
                  <div className="flex justify-center">
                    <button className="p-2 text-slate-400 hover:text-slate-900 rounded-lg transition-colors">
                      <MoreVertical size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
