'use client'

import { useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'

const placeholderItems = [
    { id: 1, name: 'Ergonomic Grip Mug', price: 34.99, quantity: 1 },
    { id: 2, name: 'Large Button Remote', price: 24.99, quantity: 2 },
    { id: 3, name: 'Non-Slip Bath Mat', price: 19.99, quantity: 1 },
]

export default function CheckoutPage() {

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    const total = placeholderItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    async function handlePlaceOrder() {
        setLoading(true)
        setError('')

        try {
            // placeholder — will call Flask later
            await new Promise(resolve => setTimeout(resolve, 1000))
            window.location.href = '/order-confirmation'

        } catch (err) {
            setError('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '2rem 1.5rem',
        }}>

            <h1 style={{
                fontSize: '2rem',
                fontWeight: 700,
                color: 'var(--color-primary)',
                marginBottom: '2rem',
            }}>
                Checkout
            </h1>

            <Link href="/cart">← Back to cart</Link>

            <div style={{ marginTop: '2rem' }}>

                {/* Order summary */}
                <div style={{
                    backgroundColor: 'var(--color-surface)',
                    borderRadius: '12px',
                    border: '1px solid var(--color-border)',
                    padding: '1.5rem',
                    marginBottom: '1.5rem',
                }}>
                    <h2 style={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: 'var(--color-text)',
                        marginBottom: '1rem',
                    }}>
                        Order Summary
                    </h2>

                    {placeholderItems.map(item => (
                        <div key={item.id} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            marginBottom: '0.75rem',
                        }}>
                            <p style={{ color: 'var(--color-text)' }}>
                                {item.name} × {item.quantity}
                            </p>
                            <p style={{ color: 'var(--color-text)', fontWeight: 600 }}>
                                ${(item.price * item.quantity).toFixed(2)}
                            </p>
                        </div>
                    ))}

                    <div style={{
                        borderTop: '1px solid var(--color-border)',
                        paddingTop: '1rem',
                        marginTop: '1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                    }}>
                        <p style={{ fontSize: '18px', fontWeight: 700 }}>Total</p>
                        <p style={{
                            fontSize: '18px',
                            fontWeight: 700,
                            color: 'var(--color-primary)',
                        }}>
                            ${total.toFixed(2)}
                        </p>
                    </div>
                </div>

                {/* Shipping address placeholder */}
                <div style={{
                    backgroundColor: 'var(--color-surface)',
                    borderRadius: '12px',
                    border: '1px solid var(--color-border)',
                    padding: '1.5rem',
                    marginBottom: '1.5rem',
                }}>
                    <h2 style={{
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: 'var(--color-text)',
                        marginBottom: '1rem',
                    }}>
                        Shipping Address
                    </h2>
                    <p style={{ color: 'var(--color-text-muted)' }}>
                        123 Example Street, Auckland, New Zealand
                    </p>
                </div>

                {error && (
                    <p style={{
                        color: '#721c24',
                        backgroundColor: '#f8d7da',
                        padding: '12px',
                        borderRadius: '8px',
                        marginBottom: '1rem',
                    }}>
                        {error}
                    </p>
                )}

                <Button variant="primary" onClick={handlePlaceOrder} disabled={loading}>
                    {loading ? 'Placing order...' : 'Place Order'}
                </Button>

            </div>
        </main>
    )
}