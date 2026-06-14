'use client'

import { useState } from 'react'
import Link from 'next/link'
import Button from '@/components/ui/Button'
import styles from './checkout.module.css'
import shared from '@/components/ui/shared.module.css'

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
            await new Promise(resolve => setTimeout(resolve, 1000))
            window.location.href = '/order-confirmation'
        } catch (err) {
            setError('Something went wrong. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <main className={styles.page}>

            <h1 className={styles.title}>Checkout</h1>

            <Link href="/cart">← Back to cart</Link>

            <div className={styles.content}>

                {/* Order summary card */}
                <div className={styles.card}>
                    <h2 className={styles.cardTitle}>Order Summary</h2>

                    {placeholderItems.map(item => (
                        <div key={item.id} className={styles.summaryRow}>
                            <p className={styles.summaryName}>
                                {item.name} × {item.quantity}
                            </p>
                            <p className={styles.summaryPrice}>
                                ${(item.price * item.quantity).toFixed(2)}
                            </p>
                        </div>
                    ))}

                    <div className={styles.summaryDivider}>
                        <p className={styles.totalLabel}>Total</p>
                        <p className={styles.totalAmount}>${total.toFixed(2)}</p>
                    </div>
                </div>

                {/* Shipping address card */}
                <div className={styles.card}>
                    <h2 className={styles.cardTitle}>Shipping Address</h2>
                    <p className={styles.address}>
                        123 Example Street, Auckland, New Zealand
                    </p>
                </div>

                {/* Error message */}
                {error && <p className={shared.error}>{error}</p>}

                {/* Place order button */}
                <div className={styles.actions}>
                    <Button variant="primary" onClick={handlePlaceOrder} disabled={loading}>
                        {loading ? 'Placing order...' : 'Place Order'}
                    </Button>
                </div>

            </div>
        </main>
    )
}