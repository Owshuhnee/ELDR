'use client'

import Link from 'next/link'
import VerifiedBadge from '@/components/ui/VerifiedBadge';
import { useState, useEffect } from 'react'

type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    needsTag: string;
    verified: boolean;
    image?: string;
}

type Props = {
    product: Product;
}

export default function ProductCard({ product }: Props) {

    const [saved, setSaved] = useState(false)
    useEffect(() => {
        const stored = localStorage.getItem(`wishlist-${product.id}`)
        if (stored === 'true') setSaved(true)
    }, [])
    useEffect(() => {
        localStorage.setItem(`wishlist-${product.id}`, String(saved))
    }, [saved])

    async function handleWishlistToggle() {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        if (!user.id) return

        if (!saved) {

            const res = await fetch('http://localhost:5000/api/wishlist/add', {

                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: user.id, product_id: product.id })
            })
            const data = await res.json()

        } else {
            await fetch('http://localhost:5000/api/wishlist/remove', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ user_id: user.id, product_id: product.id })
            })
        }   
        setSaved(!saved)
    }

    return (
        <article style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: '12px',
            border: '1px solid var(--color-border)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            overflow: 'hidden',
        }}>
            <div style={{ position: 'relative'}}>

            
            <img
                src={product.image ?? 'https://placehold.co/400x220'}
                alt={product.name}
                style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
            />

            <button onClick={handleWishlistToggle}

            aria-label={saved ? "Remove from wishlist" : "Save to wishlist"}
            style={{position: 'absolute', top: '12px', right: '12px',
                minWidth: '44px', minHeight: '44px',
                background: 'rgba(255,255,255,0.85)', borderRadius: '50%', border: 'none', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
             }}>
             <span style={{ fontSize: '20px', color: saved ? 'var(--color-primary)' : 'var(--color-text-muted)'}}>
             {saved ? '❤' : '♡'}
             </span>
                
            </button>
            </div>

            <div style={{ padding: '20px 24px 24px' }}>
                <p style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    marginBottom: '4px',
                    textDecoration: 'none',
                }}>
                    <Link href={`/product/${product.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {product.name}
                    </Link>
                </p>

                {product.verified && (
                    <div style={{ marginBottom: '8px' }}>
                        <VerifiedBadge />
                    </div>
                )}

                <p style={{
                    color: 'var(--color-text-muted)',
                    fontSize: '15px',
                    marginBottom: '12px',
                    lineHeight: 1.5,
                }}>
                    {product.description}
                </p>

                <p style={{
                    fontSize: '22px',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    marginBottom: '20px',
                }}>
                    ${product.price.toFixed(2)}
                </p>

                <Link
                    href={`/product/${product.id}`}
                    style={{
                        display: 'block',
                        textAlign: 'center',
                        textDecoration: 'none',
                        backgroundColor: 'var(--color-primary)',
                        color: '#ffffff',
                        borderRadius: '24px',
                        padding: '14px 24px',
                        fontSize: '16px',
                        fontWeight: 600,
                        minHeight: '44px',
                    }}
                >
                    More Information
                </Link>
            </div>
        </article>
    )
}
