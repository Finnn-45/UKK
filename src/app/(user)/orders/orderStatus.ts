import type { OrderStatus } from '@/types/order'

const PROGRESSION: OrderStatus[] = [
  'Menunggu konfirmasi',
  'Dikemas',
  'Dikirim',
  'Selesai',
]

/**
 * Simulasikan progression status berdasarkan waktu createdAt.
 *
 * Durasi (ms) bisa kamu sesuaikan:
 * - Menunggu konfirmasi: 10 detik
 * - Dikemas: 10 detik
 * - Dikirim: 10 detik
 */
export function getStatusByProgress(createdAtIso: string): OrderStatus {
  const createdAt = new Date(createdAtIso).getTime()
  const now = Date.now()

  const diff = Math.max(0, now - createdAt)
  const stepMs = 10_000

  const idx = Math.min(PROGRESSION.length - 1, Math.floor(diff / stepMs))
  return PROGRESSION[idx]
}

