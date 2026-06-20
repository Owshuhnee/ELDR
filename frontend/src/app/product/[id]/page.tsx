'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import VerifiedBadge from '@/components/ui/VerifiedBadge'
import type { Product } from '@/data/products'

export default function ProductPage() {
  const params = useParams()
  const id = Number(params.id)

  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [addedToCart, setAddedToCart] = useState(false)

  const handleAddToCart = async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}')
    if (!user.id) { window.location.href = '/login'; return }
    await fetch('http://localhost:5000/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: user.id, product_id: id, quantity: 1 })
    })
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }


  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.products.map((item: any) => ({
            id: item.id,
            name: item.title,
            price: item.price,
            image: item.image,
            description: item.description,
            needsTag: item.category.replace('_', ' '),
            verified: item.verified,
        }))
        setProducts(mapped)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load products')
        setLoading(false)
      })
  }, [])

  const product = products.find((p) => p.id === id)
  if (loading) return <p>Loading...</p>
  if (error) return <p>{error}</p>
  if (!product) return <p>Product not found.</p>

  return <main style={{
    maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem'

  }}>
    <img src={product.image ?? '/placeholder.png'} alt={product.name} style={{ 
        width: '100%', height: '400px', objectFit: 'cover', borderRadius: '16px' 
        }} />
        <h1>{product.name}</h1>
        {product.verified && <VerifiedBadge />}
        <p>{`$${product.price}`}</p>
        <p>{product.description}</p>
        <p>{product.needsTag}</p>
        <button onClick={handleAddToCart} style={{ 
            height: '52px', padding: '0 32px', borderRadius: '24px',
            backgroundColor: 'var(--color-primary)', color: '#ffffff',
            fontSize: '18px', border: 'none', cursor: 'pointer'
            }}>
            {addedToCart ? 'Added to Cart!' : 'Add to Cart'}
        </button>
        <Link href="/">Back to products</Link>
  </main>
  
}
