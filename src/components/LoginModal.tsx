'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Link from 'next/link'

interface LoginModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function LoginModal({ isOpen, onClose }: LoginModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
          >
            <div className="bg-white rounded-3xl shadow-2xl p-8 relative">
              {/* Close Button */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
              >
                <X size={20} className="text-gray-600" />
              </button>

              {/* Content */}
              <div className="text-center mb-8">
                <div className="inline-block bg-orange-100 p-4 rounded-full mb-4">
                  <span className="text-4xl">🔐</span>
                </div>

                <h2 className="text-2xl md:text-3xl font-black mb-3">
                  Login Diperlukan
                </h2>

                <p className="text-gray-600 leading-relaxed">
                  Untuk melanjutkan checkout dan menyelesaikan pembelian, kamu harus login terlebih dahulu. Sudah punya akun?
                </p>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <Link href="/login" className="block w-full">
                  <button
                    onClick={onClose}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-2xl transition-all duration-200"
                  >
                    Login Sekarang
                  </button>
                </Link>

                <div className="relative flex items-center">
                  <div className="flex-1 border-t border-gray-200"></div>
                  <span className="px-3 text-gray-400 text-sm">atau</span>
                  <div className="flex-1 border-t border-gray-200"></div>
                </div>

                <Link href="/register" className="block w-full">
                  <button
                    onClick={onClose}
                    className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold py-3 px-4 rounded-2xl transition-all duration-200"
                  >
                    Buat Akun Baru
                  </button>
                </Link>

                <button
                  onClick={onClose}
                  className="w-full text-gray-600 hover:text-gray-800 font-semibold py-2 transition-colors"
                >
                  Lanjut Lihat-lihat
                </button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
