'use client'

import Link from 'next/link'
import Button from '@/components/ui/Button'
import styles from './order-confirmation.module.css'

export default function OrderConfirmationPage() {

    const placeholderOrder = {
        order_id: 1,
        status: 'Pending',
        total_amount: 104.96,
        created_at: '2026-06-08T22:00:00+00:00',
        items: [
            { product_id: 1, name: 'Ergonomic Grip Mug', price_at_purchase: 34.99, quantity: 1 },
            { product_id: 2, name: 'Large Button Remote', price_at_purchase: 24.99, quantity: 2 },
            { product_id: 3, name: 'Non-Slip Bath Mat', price_at_purchase: 19.99, quantity: 1 },
        ]
    }

    return (
        <main className={styles.page}>

            {/* Success header */}
            <div className={styles.header}>
                <div className={styles.checkmark}>✓</div>
                <h1 className={styles.title}>Order Confirmed!</h1>
                <p className={styles.subtitle}>
                    Thank you for your order. Order #{placeholderOrder.order_id}
                </p>
            </div>

            {/* Order details card */}
            <div className={styles.card}>
                <h2 className={styles.cardTitle}>Order Details</h2>

                <div className={styles.row}>
                    <p className={styles.rowLabel}>Order ID</p>
                    <p className={styles.rowValue}>#{placeholderOrder.order_id}</p>
                </div>

                <div className={styles.row}>
                    <p className={styles.rowLabel}>Status</p>
                    <span className={styles.statusBadge}>{placeholderOrder.status}</span>
                </div>

                <div className={styles.row}>
                    <p className={styles.rowLabel}>Date</p>
                    <p className={styles.rowValue}>
                        {new Date(placeholderOrder.created_at).toLocaleDateString()}
                    </p>
                </div>
            </div>

            {/* Items ordered card */}
            <div className={styles.card}>
                <h2 className={styles.cardTitle}>Items Ordered</h2>

                {placeholderOrder.items.map(item => (
                    <div key={item.product_id} className={styles.row}>
                        <p className={styles.rowLabel}>
                            {item.name} × {item.quantity}
                        </p>
                        <p className={styles.rowValue}>
                            ${(item.price_at_purchase * item.quantity).toFixed(2)}
                        </p>
                    </div>
                ))}

                <div className={styles.divider}>
                    <p className={styles.totalLabel}>Total</p>
                    <p className={styles.totalAmount}>
                        ${placeholderOrder.total_amount.toFixed(2)}
                    </p>
                </div>
            </div>

            {/* Actions */}
            <div className={styles.actions}>
                <Link href="/" style={{ textDecoration: 'none' }}>
                    <Button variant="primary">Continue Shopping</Button>
                </Link>
            </div>

        </main>
    )
}