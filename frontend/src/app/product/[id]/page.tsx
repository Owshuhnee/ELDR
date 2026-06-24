'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import VerifiedBadge from '@/components/ui/VerifiedBadge'
import type { Product } from '@/data/products'
import SpeakButton from '@/components/ui/SpeakButton'

export default function ProductPage() {
    const params = useParams()
    const id = params.id as string

    const [product, setProduct] = useState<Product | null>(null)
    const [loading, setLoading] = useState(true)
    const [added, setAdded] = useState(false)

    useEffect(() => {
        fetch('http://localhost:5000/api/products')
            .then((res) => res.json())
            .then((data) => {
                const mapped = data.products.map((item: any) => ({
                    id: item.id,
                    name: item.title,
                    price: item.price,
                    description: item.description,
                    needsTag: item.category.replace('_', ' '),
                    verified: item.verified,
                    image: item.image,
                }))
                const found = mapped.find((p: Product) => p.id === Number(id))
                setProduct(found ?? null)
                setLoading(false)
            })
            .catch(() => setLoading(false))
    }, [id])

    async function handleAddToCart() {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        const userId = user.id
        if (!userId) {
            window.location.href = '/login'
            return
        }
        await fetch('http://localhost:5000/api/cart/add', {
            method: 'POST',
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ user_id: userId, product_id: product!.id, quantity: 1 }),
        })
        setAdded(true)
        setTimeout(() => setAdded(false), 2000)
    }

    if (loading) return <p style={{ padding: '2rem', fontSize: '18px' }}>Loading…</p>
    if (!product) return <p style={{ padding: '2rem', fontSize: '18px' }}>Product not found.</p>

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1.5rem' }}>
            <Link href="/" style={{ color: 'var(--color-primary)', textDecoration: 'none', fontSize: '16px' }}>
                ← Back to products
            </Link>

            {product.image && (
                <img
                    src={product.image}
                    alt={product.name}
                    style={{ width: '100%', height: '400px', objectFit: 'cover', borderRadius: '12px', marginTop: '1.5rem', display: 'block' }}
                />
            )}

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '1.5rem', flexWrap: 'wrap' }}>
                <h1 style={{ fontSize: '28px', fontWeight: 700, color: 'var(--color-text)', margin: 0 }}>
                    {product.name}
                </h1>
                <SpeakButton text={product.name} label="product name" />
            </div>


            {product.verified && <div style={{ marginTop: '8px' }}><VerifiedBadge /></div>}

            <p style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-text)', marginTop: '12px' }}>
                ${product.price.toFixed(2)}
            </p>

            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginTop: '12px' }}>
                <p style={{ fontSize: '18px', color: 'var(--color-text-muted)', lineHeight: 1.6, margin: 0 }}>
                    {product.description}
                </p>
                <SpeakButton text={product.description} label="product description" />
            </div>


            <button
                onClick={handleAddToCart}
                style={{
                    marginTop: '2rem',
                    display: 'block',
                    width: '100%',
                    backgroundColor: 'var(--color-primary)',
                    color: '#ffffff',
                    borderRadius: '24px',
                    padding: '14px 24px',
                    fontSize: '18px',
                    fontWeight: 600,
                    border: 'none',
                    cursor: 'pointer',
                    minHeight: '56px',
                }}
            >
                {added ? 'Added to Cart!' : 'Add to Cart'}
            </button>
        </div>
    )
}
