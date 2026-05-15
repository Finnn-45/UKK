'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function AdminLogin() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')
    const password = formData.get('password')

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json()

    if (res.ok) {
      document.cookie = `admin_token=${data.token}; path=/; max-age=3600`
      router.push('/admin')
    } else {
      setError(data.message || 'Login gagal')
      setLoading(false)
    }
  }

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center', 
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
    }}>
      <form onSubmit={handleSubmit} style={{ 
        background: 'white', 
        padding: '40px', 
        borderRadius: '16px', 
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)',
        width: '100%',
        maxWidth: '400px'
      }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px', textAlign: 'center', color: '#1f2937' }}>
          🔐 Login Admin
        </h1>
        <p style={{ color: '#6b7280', textAlign: 'center', marginBottom: '24px' }}>
          Catering Management System
        </p>
        
        {error && (
          <div style={{ 
            background: '#fee2e2', 
            color: '#991b1b', 
            padding: '12px', 
            borderRadius: '8px', 
            marginBottom: '16px',
            fontSize: '14px'
          }}>
            {error}
          </div>
        )}

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>Email</label>
          <input name="email" type="email" required placeholder="admin@catering.com" style={{ 
            width: '100%', 
            padding: '12px', 
            border: '1px solid #d1d5db', 
            borderRadius: '8px',
            fontSize: '14px'
          }} />
        </div>

        <div style={{ marginBottom: '24px' }}>
          <label style={{ display: 'block', fontWeight: '600', marginBottom: '8px', color: '#374151' }}>Password</label>
          <input name="password" type="password" required placeholder="••••••••" style={{ 
            width: '100%', 
            padding: '12px', 
            border: '1px solid #d1d5db', 
            borderRadius: '8px',
            fontSize: '14px'
          }} />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          style={{ 
            width: '100%',
            padding: '14px', 
            background: '#3b82f6', 
            border: 'none',
            borderRadius: '8px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: '600',
            color: 'white',
            fontSize: '16px',
            opacity: loading ? 0.6 : 1
          }}
        >
          {loading ? 'Loading...' : 'Masuk'}
        </button>
      </form>
    </div>
  )
}