import prisma from '@/lib/prisma'
import Link from 'next/link'
import {
  Utensils,
  Users,
  ShoppingBag,
  Star,
  ArrowUpRight,
  Plus,
  MoreVertical
} from 'lucide-react'

export default async function AdminDashboard() {
  // Ambil Data Real dari Database
  const [totalMenus, totalUsers, recentMenus] = await Promise.all([
    prisma.menu.count(),
    prisma.user.count(),
    prisma.menu.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, category: true, price: true, rating: true }
    })
  ])

  return (
    <div className="relative min-h-screen bg-[#F5F7FB]">
      {/* Visual Header - Indigo Gradient & Pattern */}
      <div className="bg-gradient-to-r from-indigo-600 to-violet-600 h-72 w-full absolute top-0 left-0 -z-0 shadow-inner">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)',
            backgroundSize: '20px 20px'
          }}
        ></div>
      </div>

      <div className="relative z-10 p-4 md:p-10 lg:p-12 max-w-[1600px] mx-auto">
        {/* Top Section: Title & Action */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-extrabold text-white tracking-tight">Rice & Shine Control</h1>
            <p className="text-indigo-100 mt-2 font-medium">Monitoring performa katering kamu secara real-time.</p>
          </div>
          <Link href="/admin/create">
            <button className="flex items-center gap-2 bg-white text-indigo-600 px-6 py-3 rounded-xl font-bold shadow-xl hover:scale-105 active:scale-95 transition-transform duration-200">
              <Plus size={20} />
              Tambah Menu Baru
            </button>
          </Link>
        </div>

        {/* Statistik Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          <StatCard
            title="Total Menu"
            value={totalMenus}
            icon={<Utensils className="text-indigo-600" size={24} />}
            trend="+12% bulan ini"
            bgColor="bg-indigo-50"
          />
          <StatCard
            title="Total User"
            value={totalUsers}
            icon={<Users className="text-emerald-600" size={24} />}
            trend="+5 member baru"
            bgColor="bg-emerald-50"
          />
          <StatCard
            title="Menu Terjual"
            value="1.2k"
            icon={<ShoppingBag className="text-orange-600" size={24} />}
            trend="+8% dari kemarin"
            bgColor="bg-orange-50"
          />
          <StatCard
            title="Avg Rating"
            value="4.8"
            icon={<Star className="text-amber-500" size={24} />}
            trend="Stabil"
            bgColor="bg-amber-50"
          />
        </div>

        {/* Recent Activity / Table Section */}
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
      </div>
    </div>
  )
}

// Sub-component StatCard yang Lebih Mewah
function StatCard({ title, value, icon, trend, bgColor }: any) {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col gap-4 hover:shadow-md hover:border-indigo-100 transition-all duration-300">
      <div className="flex justify-between items-center">
        <div className={`p-3 rounded-xl ${bgColor}`}>
          {icon}
        </div>
        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-md">
          {trend}
        </span>
      </div>
      <div>
        <h4 className="text-slate-500 text-xs font-bold uppercase tracking-wider">{title}</h4>
        <div className="text-3xl font-black text-slate-900 mt-1">{value}</div>
      </div>
    </div>
  )
}