import prisma from '@/lib/prisma'
import Link from 'next/link'
import DeleteButton from './DeleteButton'
import { 
  Utensils, 
  Plus, 
  Star, 
  Pencil, 
  Search,
  PackageOpen,
  ArrowRight
} from 'lucide-react'

// Map kategori ke warna Tailwind agar lebih konsisten
const categoryStyles: Record<string, string> = {
  Breakfast: 'bg-amber-100 text-amber-700 border-amber-200',
  Lunch: 'bg-emerald-100 text-emerald-700 border-emerald-200',
  Dinner: 'bg-blue-100 text-blue-700 border-blue-200',
  Dessert: 'bg-pink-100 text-pink-700 border-pink-200',
  Snack: 'bg-orange-100 text-orange-700 border-orange-200',
  Healthy: 'bg-teal-100 text-teal-700 border-teal-200',
  Catering: 'bg-purple-100 text-purple-700 border-purple-200',
}

export default async function MenuList() {
  const menus = await prisma.menu.findMany({ orderBy: { createdAt: 'desc' } })

  return (
    <div className="p-4 md:p-10 lg:p-12 max-w-[1600px] mx-auto min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="p-2 bg-indigo-600 rounded-lg text-white">
              <Utensils size={20} />
            </div>
            <span className="text-sm font-bold text-indigo-600 uppercase tracking-widest">Katalog</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">Kelola Menu</h1>
          <p className="text-slate-500 mt-1 font-medium">{menus.length} menu terdaftar di database.</p>
        </div>

        <Link href="/admin/menu/create">
          <button className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-4 rounded-2xl font-bold shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200">
            <Plus size={20} />
            Tambah Menu Baru
          </button>
        </Link>
      </div>

      {menus.length === 0 ? (
        /* Empty State */
        <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-16 text-center shadow-sm">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
            <PackageOpen size={40} />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Belum ada menu, nih!</h3>
          <p className="text-slate-500 mb-8 max-w-sm mx-auto">Mulai isi katalog Rice & Shine dengan menambahkan menu andalan kateringmu.</p>
          <Link href="/admin/menu/create">
            <button className="inline-flex items-center gap-2 text-indigo-600 font-bold hover:gap-3 transition-all">
              Buat menu pertama <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      ) : (
        /* Grid Menu */
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          {menus.map((menu) => (
            <div 
              key={menu.id} 
              className="bg-white rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl hover:border-indigo-100 transition-all duration-300 group overflow-hidden"
            >
              {/* Image Container */}
              <div className="relative h-56 w-full overflow-hidden">
                <img 
                  src={menu.image || 'https://via.placeholder.com/400x300?text=No+Image'} 
                  alt={menu.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className={`px-4 py-1.5 rounded-full text-xs font-bold border shadow-sm ${categoryStyles[menu.category] || 'bg-slate-100 text-slate-700 border-slate-200'}`}>
                    {menu.category}
                  </span>
                </div>
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-xl flex items-center gap-1 shadow-sm">
                  <Star size={14} className="text-amber-500 fill-amber-500" />
                  <span className="text-xs font-bold text-slate-800">{menu.rating}</span>
                </div>
              </div>
              
              {/* Content */}
              <div className="p-8">
                <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-indigo-600 transition-colors line-clamp-1">
                  {menu.title}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-6 line-clamp-2 min-h-[40px]">
                  {menu.description}
                </p>
                
                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Harga Satuan</p>
                    <p className="text-xl font-black text-indigo-600">
                      Rp {menu.price.toLocaleString('id-ID')}
                    </p>
                  </div>
                  
                  <div className="flex gap-2">
                    <Link href={`/admin/menu/${menu.id}/edit`}>
                      <button className="p-3 bg-slate-50 text-slate-600 rounded-xl hover:bg-amber-100 hover:text-amber-700 transition-all active:scale-90 shadow-sm">
                        <Pencil size={18} />
                      </button>
                    </Link>
                    <DeleteButton id={menu.id} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}