"use client"; // Wajib pakai ini untuk usePathname

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  PlusCircle, 
  Users, 
  Settings,
  Search
} from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-[#F5F7FB]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#0F172A] text-slate-400 hidden md:flex flex-col sticky top-0 h-screen shadow-xl">
        {/* Branding */}
        <div className="p-8 flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white font-bold">
            R
          </div>
          <span className="text-xl font-bold text-white tracking-tight">Rice & Shine</span>
        </div>

        {/* Navigation Groups */}
        <nav className="flex-1 px-4 space-y-8 overflow-y-auto pb-8">
          
          {/* Main Group */}
          <div>
            <p className="px-4 text-[10px] font-bold uppercase tracking-[2px] text-slate-500 mb-4">
              Main Dashboard
            </p>
            <div className="space-y-1">
              <SidebarItem 
                href="/admin" 
                icon={<LayoutDashboard size={18} />} 
                label="Dashboard Overview" 
              />
            </div>
          </div>

          {/* Menu Management Group */}
          <div>
            <p className="px-4 text-[10px] font-bold uppercase tracking-[2px] text-slate-500 mb-4">
              Menu Management
            </p>
            <div className="space-y-1">
              <SidebarItem 
                href="/admin/menu" 
                icon={<UtensilsCrossed size={18} />} 
                label="All Menus" 
              />
              <SidebarItem 
                href="/admin/create" 
                icon={<PlusCircle size={18} />} 
                label="Add New Menu" 
              />
            </div>
          </div>

          {/* System Group */}
          <div>
            <p className="px-4 text-[10px] font-bold uppercase tracking-[2px] text-slate-500 mb-4">
              System Admin
            </p>
            <div className="space-y-1">
              <SidebarItem 
                href="/admin/users" 
                icon={<Users size={18} />} 
                label="Users List" 
              />
              <SidebarItem 
                href="/admin/settings" 
                icon={<Settings size={18} />} 
                label="Settings" 
              />
            </div>
          </div>

        </nav>

        {/* Footer Sidebar */}
        <div className="p-6 border-t border-slate-800">
          <div className="bg-slate-800/50 rounded-xl p-4 flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold">
              AD
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-semibold text-white truncate">Arfin Desca</p>
              <p className="text-xs text-slate-500 truncate">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col relative">
        {/* Top Navbar */}
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-50">
          <div className="flex items-center bg-slate-100 px-4 py-2 rounded-full w-80 border border-slate-200 focus-within:bg-white focus-within:ring-2 focus-within:ring-indigo-100 transition-all">
            <Search size={16} className="text-slate-400 mr-2" />
            <input 
              type="text" 
              placeholder="Cari sesuatu..." 
              className="bg-transparent outline-none text-sm w-full text-slate-600" 
            />
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-slate-400 hover:text-indigo-600 transition-colors">
              🔔
            </button>
          </div>
        </header>

        {/* Content Section */}
        <div className="flex-1">
          {children}
        </div>
      </main>
    </div>
  );
}

// Sub-component untuk Item Sidebar agar lebih bersih kodenya
function SidebarItem({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href} 
      className={`
        flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group
        ${isActive 
          ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-900/20' 
          : 'text-slate-400 hover:bg-slate-800 hover:text-white'
        }
      `}
    >
      <span className={`${isActive ? 'text-white' : 'text-slate-500 group-hover:text-indigo-400'} transition-colors`}>
        {icon}
      </span>
      {label}
      {isActive && (
        <div className="ml-auto w-1.5 h-1.5 bg-white rounded-full"></div>
      )}
    </Link>
  );
}