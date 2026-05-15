'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function CreateMenu() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [preview, setPreview] = useState<string>('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    const res = await fetch('/api/menu', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      router.push('/admin/menu')
    } else {
      alert('Gagal tambah menu!')
      setLoading(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPreview(e.target.value)
  }

  return (
    <div style={{ maxWidth: '800px', margin: '0 auto' }}>
      <button onClick={() => router.back()} style={{ 
        padding: '8px', 
        background: 'none', 
        border: 'none', 
        cursor: 'pointer',
        fontSize: '20px',
        marginBottom: '16px'
      }}>
        ←
      </button>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', color: '#1f2937', marginBottom: '24px' }}>
        ✨ Tambah Menu Baru
      </h1>
      
      <form onSubmit={handleSubmit} style={{ background: 'white', padding: '32px', borderRadius: '12px', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>Nama Menu *</label>
          <input name="title" required placeholder="Contoh: Nasi Goreng Special" style={{ 
            width: '100%', 
            padding: '12px', 
            border: '1px solid #d1d5db', 
            borderRadius: '8px',
            fontSize: '14px'
          }} />
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>Deskripsi *</label>
          <textarea name="description" required placeholder="Ceritakan tentang menu ini..." rows={4} style={{ 
            width: '100%', 
            padding: '12px', 
            border: '1px solid #d1d5db', 
            borderRadius: '8px',
            fontSize: '14px',
            resize: 'vertical'
          }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '20px' }}>
          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>Harga (Rp) *</label>
            <input name="price" type="number" required placeholder="25000" style={{ 
              width: '100%', 
              padding: '12px', 
              border: '1px solid #d1d5db', 
              borderRadius: '8px',
              fontSize: '14px'
            }} />
          </div>
          <div>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>Rating</label>
            <input name="rating" type="number" step="0.1" min="0" max="5" defaultValue="4.5" style={{ 
              width: '100%', 
              padding: '12px', 
              border: '1px solid #d1d5db', 
              borderRadius: '8px',
              fontSize: '14px'
            }} />
          </div>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>Kategori *</label>
          <select name="category" style={{ 
            width: '100%', 
            padding: '12px', 
            border: '1px solid #d1d5db', 
            borderRadius: '8px',
            fontSize: '14px',
            background: 'white'
          }}>
            <option value="Breakfast">🌅 Breakfast</option>
            <option value="Lunch">🍛 Lunch</option>
            <option value="Dinner">🍲 Dinner</option>
            <option value="Dessert">🍰 Dessert</option>
            <option value="Snack">🍿 Snack</option>
            <option value="Healthy">🥗 Healthy</option>
            <option value="Catering">📦 Catering</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>URL Gambar</label>
          <input name="image" type="url" placeholder="https://..." onChange={handleImageChange} style={{ 
            width: '100%', 
            padding: '12px', 
            border: '1px solid #d1d5db', 
            borderRadius: '8px',
            fontSize: '14px'
          }} />
        </div>

        {preview && (
          <div style={{ marginBottom: '20px' }}>
            <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>Preview Gambar</label>
            <img src={preview} alt="Preview" style={{ maxWidth: '100%', borderRadius: '8px', border: '1px solid #e5e7eb' }} />
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', paddingTop: '20px', borderTop: '1px solid #e5e7eb' }}>
          <button type="button" onClick={() => router.back()} style={{ 
            padding: '12px 24px', 
            background: '#f3f4f6', 
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer',
            fontWeight: '500',
            color: '#374151'
          }}>
            Batal
          </button>
          <button type="submit" disabled={loading} style={{ 
            padding: '12px 24px', 
            background: '#3b82f6', 
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: '500',
            color: 'white',
            opacity: loading ? 0.6 : 1
          }}>
            {loading ? 'Menyimpan...' : '💾 Simpan Menu'}
          </button>
        </div>
      </form>
    </div>
  )
}