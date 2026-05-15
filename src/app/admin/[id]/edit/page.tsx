'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

// Kita fetch data menu langsung di client pake fetch API biar simpel
export default function EditMenuPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [menu, setMenu] = useState<any>(null)

  // Load data saat pertama kali dibuka
  useState(() => {
    fetch(`/api/menu`)
      .then(res => res.json())
      .then(data => {
        const found = data.find((m: any) => m.id === parseInt(params.id))
        setMenu(found)
      })
  })

  if (!menu) return <div>Loading...</div>

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = Object.fromEntries(formData.entries())

    const res = await fetch(`/api/menu/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    if (res.ok) router.push('/admin/menu')
    else alert('Gagal update')
  }

  return (
    <div className="max-w-xl">
      <h1 className="text-2xl font-bold mb-6">Edit Menu</h1>
      
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nama Menu</label>
          <input name="title" defaultValue={menu.title} required className="w-full border p-2 rounded" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Deskripsi</label>
          <textarea name="description" defaultValue={menu.description} required className="w-full border p-2 rounded" rows={3} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Harga</label>
            <input name="price" type="number" defaultValue={menu.price} required className="w-full border p-2 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Kategori</label>
            <select name="category" defaultValue={menu.category} className="w-full border p-2 rounded">
              <option value="Breakfast">Breakfast</option>
              <option value="Lunch">Lunch</option>
              <option value="Dinner">Dinner</option>
              <option value="Dessert">Dessert</option>
              <option value="Snack">Snack</option>
              <option value="Healthy">Healthy</option>
              <option value="Catering">Catering</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">URL Gambar</label>
          <input name="image" type="url" defaultValue={menu.image} className="w-full border p-2 rounded" />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-yellow-500 text-white py-2 rounded hover:bg-yellow-600"
        >
          {loading ? 'Updating...' : 'Update Menu'}
        </button>
      </form>
    </div>
  )
}