import Link from 'next/link'
import { Suspense } from 'react'
import {
  Utensils,
  Users,
  ShoppingBag,
  Star,
  ArrowUpRight,
  Plus,
  MoreVertical
} from 'lucide-react'
import StatsSection from './StatsSection'
import RecentMenusSection from './RecentMenusSection'

export default function AdminDashboard() {

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

        {/* Statistik Grid - Suspense dengan Loading Skeleton */}
        <Suspense fallback={<StatsSkeleton />}>
          <StatsSection />
        </Suspense>

        {/* Recent Activity / Table Section - Suspense dengan Loading Skeleton */}
        <Suspense fallback={<MenuTableSkeleton />}>
          <RecentMenusSection />
        </Suspense>
      </div>
    </div>
  )
}

// Loading Skeleton untuk Stats
function StatsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {[...Array(4)].map((_, i) => (
        <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 animate-pulse">
          <div className="flex justify-between items-center mb-4">
            <div className="w-10 h-10 bg-slate-200 rounded-xl"></div>
            <div className="w-16 h-6 bg-slate-200 rounded-md"></div>
          </div>
          <div className="w-20 h-4 bg-slate-200 rounded mb-2"></div>
          <div className="w-24 h-8 bg-slate-300 rounded"></div>
        </div>
      ))}
    </div>
  )
}

// Loading Skeleton untuk Menu Table
function MenuTableSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/60 border border-slate-100 overflow-hidden animate-pulse">
      <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-white">
        <div className="space-y-2">
          <div className="w-32 h-6 bg-slate-200 rounded"></div>
          <div className="w-48 h-4 bg-slate-100 rounded"></div>
        </div>
        <div className="w-24 h-10 bg-slate-200 rounded-lg"></div>
      </div>
      <div className="space-y-4 p-8">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex gap-4">
            <div className="w-12 h-12 bg-slate-200 rounded-xl"></div>
            <div className="flex-1 space-y-2">
              <div className="w-full h-4 bg-slate-200 rounded"></div>
              <div className="w-24 h-3 bg-slate-100 rounded"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}