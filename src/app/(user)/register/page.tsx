'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { UserPlus, Mail, Lock, User, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export default function RegisterPage() {
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    setLoading(true)
    setError('')
    setSuccess('')

    const res = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, password }),
    })

    const data = await res.json().catch(() => ({}))

    if (!res.ok) {
      setError(data?.message || 'Gagal membuat akun')
      setLoading(false)
      return
    }

    setSuccess('Registrasi berhasil. Silakan login.')
    setLoading(false)

    setTimeout(() => {
      router.push('/login')
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] overflow-hidden relative flex items-center justify-center">
      {/* BACKGROUND DECORATION */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute top-[-20%] right-[-5%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-orange-100 rounded-full blur-[120px] opacity-50" />
        <div className="absolute bottom-[-20%] left-[-5%] w-[400px] md:w-[600px] h-[400px] md:h-[600px] bg-green-100 rounded-full blur-[120px] opacity-50" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md px-4"
      >
        <form
          onSubmit={handleSubmit}
          className="relative z-10 bg-white/80 backdrop-blur-md border border-white/20 rounded-3xl shadow-2xl p-8 md:p-10"
        >
          {/* HEADER */}
          <div className="mb-8 flex flex-col items-center">
            <div className="bg-gradient-to-tr from-amber-400 to-orange-500 p-4 rounded-2xl shadow-lg shadow-orange-200 mb-4">
              <UserPlus size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-black tracking-tight text-center mb-2">
              Daftar <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500">Sekarang</span>
            </h1>
            <p className="text-gray-500 text-center text-sm md:text-base">
              Buat akun biar bisa checkout 🛒
            </p>
          </div>

          {/* ERROR MESSAGE */}
          {error && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3"
            >
              <div className="w-1 h-1 bg-red-500 rounded-full mt-2" />
              <p className="text-red-600 text-sm font-medium">{error}</p>
            </motion.div>
          )}

          {/* SUCCESS MESSAGE */}
          {success && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 flex items-start gap-3"
            >
              <div className="w-1 h-1 bg-green-500 rounded-full mt-2" />
              <p className="text-green-600 text-sm font-medium">{success}</p>
            </motion.div>
          )}

          {/* NAME INPUT */}
          <div className="mb-5">
            <label className="block text-sm font-bold text-gray-700 mb-3">Nama Lengkap</label>
            <div className="relative">
              <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                name="name"
                type="text"
                required
                placeholder="Nama kamu"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* EMAIL INPUT */}
          <div className="mb-5">
            <label className="block text-sm font-bold text-gray-700 mb-3">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                name="email"
                type="email"
                required
                placeholder="user@email.com"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
              />
            </div>
          </div>

          {/* PASSWORD INPUT */}
          <div className="mb-8">
            <label className="block text-sm font-bold text-gray-700 mb-3">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                name="password"
                type="password"
                required
                minLength={6}
                placeholder="Minimal 6 karakter"
                className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all bg-white/50 backdrop-blur-sm"
              />
            </div>
            <p className="text-xs text-gray-400 mt-2">Minimal 6 karakter untuk keamanan</p>
          </div>

          {/* REGISTER BUTTON */}
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full py-4 bg-gradient-to-r from-orange-500 via-amber-500 to-yellow-500 text-white font-bold rounded-xl shadow-lg shadow-orange-200 hover:shadow-xl transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Membuat akun...
              </>
            ) : (
              <>
                Buat Akun
                <ArrowRight size={20} />
              </>
            )}
          </motion.button>

          {/* LOGIN LINK */}
          <p className="mt-6 text-center text-gray-600 text-sm">
            Sudah punya akun?{' '}
            <Link href="/login" className="font-bold text-orange-600 hover:text-orange-700 transition-colors">
              Masuk di sini
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  )
}

