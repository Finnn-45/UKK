'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { signIn } from 'next-auth/react'
import { motion } from 'framer-motion'
import { Lock, Mail, ArrowRight, Utensils } from 'lucide-react'
import Link from 'next/link'

export default function UserLoginPage() {
  const router = useRouter()
  const callbackUrl = '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    setError('')
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (!res || res.error) {
      setError('Email atau password salah, yuk cek lagi!')
      setLoading(false)
      return
    }

    router.push(callbackUrl)
  }

  return (
    <div className="min-h-screen bg-[#FDFCF9] overflow-hidden relative flex items-center justify-center p-4">
      
      {/* DEKORASI BACKGROUND (Menggunakan warna alpha-channel murni, bebas utilitas opacity) */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-15%] right-[-10%] w-[500px] md:w-[700px] h-[500px] md:h-[700px] bg-orange-100/40 rounded-full blur-[130px]" />
        <div className="absolute bottom-[-15%] left-[-10%] w-[500px] md:w-[700px] h-[500px] md:h-[700px] bg-amber-100/40 rounded-full blur-[130px]" />
      </div>

      {/* CONTAINER UTAMA (Animasi berbasis posisi & skala fungsional) */}
      <motion.div
        initial={{ y: 50, scale: 0.97 }}
        animate={{ y: 0, scale: 1 }}
        transition={{ type: 'spring', stiffness: 90, damping: 14 }}
        className="w-full max-w-md"
      >
        <form
          onSubmit={handleSubmit}
          className="relative z-10 bg-white border border-orange-100/70 rounded-[2.5rem] shadow-[0_32px_60px_-15px_rgba(234,88,12,0.07)] p-8 md:p-10"
        >
          {/* HEADER BRAND */}
          <div className="mb-8 flex flex-col items-center">
            <div className="bg-gradient-to-br from-orange-500 to-amber-400 p-4 rounded-2xl shadow-md shadow-orange-500/10 mb-4">
              <Utensils size={28} className="text-white" />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-zinc-900 text-center">
              Rice & <span className="text-orange-500">Shine</span>
            </h1>
            <p className="text-zinc-400 text-center text-xs font-semibold uppercase tracking-[0.15em] mt-1.5">
              Premium Catering System
            </p>
          </div>

          {/* ERROR MESSAGE (Animasi layout murni tanpa manipulasi opacity) */}
          {error && (
            <motion.div
              initial={{ height: 0, scale: 0.9 }}
              animate={{ height: 'auto', scale: 1 }}
              className="mb-6 bg-red-50 border border-red-100 rounded-2xl p-4 flex items-start gap-3 overflow-hidden"
            >
              <div className="w-5 h-5 bg-red-500 rounded-full text-white flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                !
              </div>
              <p className="text-red-700 text-sm font-semibold">{error}</p>
            </motion.div>
          )}

          {/* INPUT FIELDS BLOCK */}
          <div className="space-y-5">
            {/* EMAIL */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2 ml-1">
                Email Customer
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  name="email"
                  type="email"
                  required
                  placeholder="kamu@email.com"
                  className="w-full pl-12 pr-4 py-3.5 bg-zinc-50 border border-zinc-200/80 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400 focus:bg-white transition-all text-zinc-800 text-sm font-medium"
                />
              </div>
            </div>

            {/* PASSWORD */}
            <div>
              <label className="block text-xs font-bold text-zinc-700 uppercase tracking-wider mb-2 ml-1">
                Password
              </label>
              <div className="relative">
                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  name="password"
                  type="password"
                  required
                  placeholder="••••••••"
                  className="w-full pl-12 pr-4 py-3.5 bg-zinc-50 border border-zinc-200/80 rounded-2xl focus:outline-none focus:ring-4 focus:ring-orange-100 focus:border-orange-400 focus:bg-white transition-all text-zinc-800 text-sm font-medium"
                />
              </div>
            </div>
          </div>

          {/* CTA TOMBOL UTAMA */}
          <div className="mt-8">
            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-4 bg-zinc-900 hover:bg-zinc-800 disabled:bg-zinc-300 disabled:text-zinc-500 text-white font-bold rounded-2xl shadow-xl shadow-zinc-900/10 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Menyiapkan Dashboard...</span>
                </>
              ) : (
                <>
                  <span>Mulai Pesan Layanan</span>
                  <ArrowRight size={18} />
                </>
              )}
            </motion.button>
          </div>

          {/* SEPARATOR & REGISTER LINK */}
          <div className="mt-8 pt-6 border-t border-zinc-100 text-center">
            <p className="text-zinc-500 text-sm font-medium">
              Belum punya akun Rice & Shine?{' '}
              <Link 
                href="/register" 
                className="font-bold text-orange-600 hover:text-orange-700 underline decoration-2 underline-offset-4 transition-colors block mt-1 sm:inline sm:mt-0"
              >
                Daftar Sekarang
              </Link>
            </p>
          </div>
        </form>

        {/* FOOTER INFORMASI PROYEK */}
        <p className="text-center text-[10px] tracking-widest uppercase text-zinc-400 font-bold mt-6">
          &copy; 2026 RICE & SHINE &bull; PROYEK AKHIR UKK
        </p>
      </motion.div>
    </div>
  )
}