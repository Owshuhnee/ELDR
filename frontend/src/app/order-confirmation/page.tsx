'use client'

import Link from 'next/link'

export default function OrderConfirmationPage() {

    const placeholderOrder = {
        order_id: 1,
        status: 'pending',
        total_amount: 104.96,
        created_at: '2026-06-08T22:00:00+00:00',
        items: [
            { product_id: 1, name: 'Ergonomic Grip Mug', price_at_purchase: 34.99, quantity: 1 },
            { product_id: 2, name: 'Large Button Remote', price_at_purchase: 24.99, quantity: 2 },
            { product_id: 3, name: 'Non-Slip Bath Mat', price_at_purchase: 19.99, quantity: 1 },
        ]
    }

    return (
        <main style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '2rem 1.5rem',
        }}>

            {/* Success header */}
            <div style={{
                textAlign: 'center',
                marginBottom: '2rem',
            }}>
                <div style={{
                    fontSize: '48px',
                    marginBottom: '1rem',
                }}>
                    ✓
                </div>
                <h1 style={{
                    fontSize: '2rem',
                    fontWeight: 700,
                    color: 'var(--color-primary)',
                    marginBottom: '0.5rem',
                }}>
                    Order Confirmed!
                </h1>
                <p style={{ color: 'var(--color-text-muted)' }}>
                    Thank you for your order. Order #{placeholderOrder.order_id}
                </p>
            </div>

            {/* Order details */}
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
                    Order Details
                </h2>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                }}>
                    <p style={{ color: 'var(--color-text-muted)' }}>Order ID</p>
                    <p style={{ color: 'var(--color-text)', fontWeight: 600 }}>
                        #{placeholderOrder.order_id}
                    </p>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                }}>
                    <p style={{ color: 'var(--color-text-muted)' }}>Status</p>
                    <p style={{
                        color: 'white',
                        backgroundColor: 'var(--color-primary)',
                        padding: '2px 12px',
                        borderRadius: '999px',
                        fontSize: '14px',
                    }}>
                        {placeholderOrder.status}
                    </p>
                </div>

                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.5rem',
                }}>
                    <p style={{ color: 'var(--color-text-muted)' }}>Date</p>
                    <p style={{ color: 'var(--color-text)' }}>
                        {new Date(placeholderOrder.created_at).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* Items */}
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
                    Items Ordered
                </h2>

                {placeholderOrder.items.map(item => (
                    <div key={item.product_id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginBottom: '0.75rem',
                    }}>
                        <p style={{ color: 'var(--color-text)' }}>
                            {item.name} × {item.quantity}
                        </p>
                        <p style={{ color: 'var(--color-text)', fontWeight: 600 }}>
                            ${(item.price_at_purchase * item.quantity).toFixed(2)}
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
                        ${placeholderOrder.total_amount.toFixed(2)}
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div style={{
                display: 'flex',
                gap: '1rem',
            }}>
                <Link
                    href="/"
                    style={{
                        display: 'block',
                        flex: 1,
                        textAlign: 'center',
                        padding: '16px',
                        backgroundColor: 'var(--color-primary)',
                        color: 'white',
                        borderRadius: '24px',
                        fontSize: '18px',
                        fontWeight: 600,
                        textDecoration: 'none',
                    }}
                >
                    Continue Shopping
                </Link>
            </div>

        </main>
    )
}