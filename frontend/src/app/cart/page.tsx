'use client'

import Link from 'next/link'
import { useState } from 'react'
import Button from '@/components/ui/Button'

const placeholderItems = [
    { id: 1, product_id: 1, name: 'Ergonomic Grip Mug', price: 34.99, quantity: 1 },
    { id: 2, product_id: 2, name: 'Large Button Remote', price: 24.99, quantity: 2 },
    { id: 3, product_id: 3, name: 'Non-Slip Bath Mat', price: 19.99, quantity: 1 },
]

export default function CartPage() {

    const [cartItems, setCartItems] = useState(placeholderItems)

    function handleRemove(itemId: number) {
        setCartItems(cartItems.filter(item => item.id !== itemId))
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

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
                Your Cart
            </h1>

            <Link href="/">← Back to products</Link>

            {cartItems.length === 0 ? (
                <p style={{
                    color: 'var(--color-text-muted)',
                    marginTop: '2rem',
                }}>
                    Your cart is empty.
                </p>
            ) : (
                <div style={{ marginTop: '2rem' }}>

                    {cartItems.map(item => (
                        <div key={item.id} style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            padding: '1.5rem',
                            marginBottom: '1rem',
                            backgroundColor: 'var(--color-surface)',
                            borderRadius: '12px',
                            border: '1px solid var(--color-border)',
                        }}>
                            <div>
                                <p style={{
                                    fontSize: '18px',
                                    fontWeight: 600,
                                    color: 'var(--color-text)',
                                    marginBottom: '4px',
                                }}>
                                    {item.name}
                                </p>
                                <p style={{
                                    color: 'var(--color-text-muted)',
                                    fontSize: '16px',
                                }}>
                                    Qty: {item.quantity} × ${item.price.toFixed(2)}
                                </p>
                            </div>

                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '1rem',
                            }}>
                                <p style={{
                                    fontSize: '20px',
                                    fontWeight: 700,
                                    color: 'var(--color-text)',
                                }}>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>

                               <Button variant="danger" fullWidth={false} onClick={() => handleRemove(item.id)}>
                                    Remove
                                </Button>
                                
                            </div>
                        </div>
                    ))}

                    <div style={{
                        borderTop: '2px solid var(--color-border)',
                        paddingTop: '1.5rem',
                        marginTop: '1rem',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                    }}>
                        <p style={{
                            fontSize: '20px',
                            fontWeight: 700,
                            color: 'var(--color-text)',
                        }}>
                            Total
                        </p>
                        <p style={{
                            fontSize: '24px',
                            fontWeight: 700,
                            color: 'var(--color-primary)',
                        }}>
                            ${total.toFixed(2)}
                        </p>
                    </div>

                    <div style={{ marginTop: '1.5rem' }}>
                        <Link
                            href="/checkout"
                            style={{
                                display: 'block',
                                textAlign: 'center',
                                padding: '16px',
                                backgroundColor: 'var(--color-primary)',
                                color: 'white',
                                borderRadius: '12px',
                                fontSize: '18px',
                                fontWeight: 600,
                                textDecoration: 'none',
                            }}
                        >
                            Proceed to Checkout
                        </Link>
                    </div>

                </div>
            )}
        </main>
    )
}