'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess(false)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    try {
      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), 12000) // 12 second timeout

      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        signal: controller.signal
      })

      clearTimeout(timeoutId)
      const data = await res.json()

      if (res.ok) {
        setSuccess(true)
        // Redirect immediately - cookie sudah di-set di response
        setTimeout(() => {
          router.push('/admin')
        }, 500) // Tunggu 0.5 detik untuk show success message
      } else {
        setError(data.message || 'Login gagal')
        setLoading(false)
      }

    } catch (err: any) {
      if (err.name === 'AbortError') {
        setError('Verifikasi timeout - server tidak merespons, coba lagi')
      } else if (err instanceof TypeError) {
        setError('Tidak bisa terhubung ke server')
      } else {
        setError('Terjadi kesalahan jaringan')
      }
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-amber-50 via-orange-50 to-zinc-100 p-4 selection:bg-orange-500 selection:text-white">
      <div className="w-full max-w-md bg-white border border-zinc-100 rounded-3xl shadow-[0_20px_50px_rgba(234,88,12,0.08)] p-8 md:p-10 transition-transform duration-300 transform scale-100 hover:scale-[1.01]">
        
        {/* Header Logo & Brand */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-linear-to-tr from-orange-500 to-amber-400 rounded-2xl flex items-center justify-center shadow-lg shadow-orange-500/20 mb-4 ring-4 ring-orange-100">
            <span className="text-2xl">🍳</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-800">
            RICE & SHINE
          </h1>
          <p className="text-sm font-medium text-zinc-400 mt-1 uppercase tracking-wider">
            Catering Management
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border-l-4 border-red-500 text-red-800 p-4 rounded-xl text-sm flex items-start gap-2 animate-pulse">
              <span className="mt-0.5">⚠️</span>
              <p className="font-medium">{error}</p>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="bg-emerald-50 border-l-4 border-emerald-500 text-emerald-800 p-4 rounded-xl text-sm flex items-start gap-2 animate-pulse">
              <span className="mt-0.5">✅</span>
              <p className="font-medium">Login berhasil! Mengalihkan...</p>
            </div>
          )}

          {/* Email Input */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-zinc-700 tracking-wide">
              Email Administrasi
            </label>
            <div className="relative">
              <input
                name="email"
                type="email"
                required
                disabled={loading || success}
                placeholder="admin@ricenshine.com"
                className="w-full px-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl text-zinc-800 placeholder-zinc-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Password Input */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-sm font-semibold text-zinc-700 tracking-wide">
                Kata Sandi
              </label>
            </div>
            <div className="relative">
              <input
                name="password"
                type="password"
                required
                disabled={loading || success}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 bg-zinc-50 border border-zinc-200 rounded-2xl text-zinc-800 placeholder-zinc-400 text-sm font-medium transition-all duration-200 focus:outline-none focus:border-orange-500 focus:bg-white focus:ring-4 focus:ring-orange-100 disabled:opacity-60 disabled:cursor-not-allowed"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading || success}
            className="w-full py-4 bg-linear-to-r from-zinc-900 to-zinc-800 hover:from-zinc-800 hover:to-zinc-700 disabled:from-zinc-400 disabled:to-zinc-400 text-white rounded-2xl font-semibold text-sm tracking-wide shadow-xl shadow-zinc-900/10 active:scale-[0.99] transition-all duration-200 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="stroke-current opacity-25" cx="12" cy="12" r="10" strokeWidth="4" />
                  <path className="fill-current" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <div className="flex flex-col items-start">
                  <span>Memverifikasi Password...</span>
                  <span className="text-xs opacity-75">Mohon tunggu sebentar</span>
                </div>
              </>
            ) : success ? (
              <>
                <svg className="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Login Berhasil!</span>
              </>
            ) : (
              'Masuk ke Dashboard'
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-zinc-400 font-medium mt-8">
          &copy; 2026 RICE & SHINE &bull; Proyek Akhir UKK
        </p>
      </div>
    </div>
  )
}