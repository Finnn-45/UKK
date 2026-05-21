import prisma from '@/lib/prisma'
import { Utensils, Users, ShoppingBag, Star } from 'lucide-react'

export default async function StatsSection() {
  // Data fetching hanya terjadi saat component ini di-render oleh Suspense
  const [totalMenus, totalUsers] = await Promise.all([
    prisma.menu.count(),
    prisma.user.count()
  ])

  return (
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
  )
}

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
