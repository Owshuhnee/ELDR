'use client'

import Link from 'next/link'
import { useState } from 'react'
import Button from '@/components/ui/Button'
import styles from './cart.module.css'

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

    function handleQuantityChange(itemId: number, change: number) {
        setCartItems(cartItems.map(item =>
            item.id === itemId
                ? { ...item, quantity: Math.max(1, item.quantity + change) }
                : item
        ))
    }

    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

    return (
        <main className={styles.page}>

            <h1 className={styles.title}>Your Cart</h1>

            {cartItems.length === 0 ? (
                <p className={styles.empty}>Your cart is empty.</p>
            ) : (
                <div className={styles.itemList}>

                    {cartItems.map(item => (
                        <div key={item.id} className={styles.item}>

                            {/* Product image placeholder */}
                            <div className={styles.itemImage} />

                            {/* Product name and price */}
                            <div className={styles.itemInfo}>
                                <p className={styles.itemName}>{item.name}</p>
                                <p className={styles.itemPrice}>${item.price.toFixed(2)}</p>

                                {/* Quantity controls */}
                                <div className={styles.quantity}>
                                    <button
                                        className={styles.quantityBtn}
                                        onClick={() => handleQuantityChange(item.id, -1)}
                                    >
                                        −
                                    </button>
                                    <span className={styles.quantityNumber}>{item.quantity}</span>
                                    <button
                                        className={styles.quantityBtn}
                                        onClick={() => handleQuantityChange(item.id, 1)}
                                    >
                                        +
                                    </button>
                                </div>
                            </div>

                            {/* Item total and remove button */}
                            <div>
                                <p className={styles.itemTotal}>
                                    ${(item.price * item.quantity).toFixed(2)}
                                </p>
                                <Button variant="danger" fullWidth={false} onClick={() => handleRemove(item.id)}>
                                    Remove
                                </Button>
                            </div>

                        </div>
                    ))}

                    {/* Total row */}
                    <div className={styles.footer}>
                        <p className={styles.totalLabel}>Total</p>
                        <p className={styles.totalAmount}>${total.toFixed(2)}</p>
                    </div>

                    {/* Action buttons */}
                    <div className={styles.actions}>
                        <Link href="/checkout" style={{ textDecoration: 'none' }}>
                            <Button variant="primary" type="button">
                                Proceed to Checkout
                            </Button>
                        </Link>
                        <Link href="/" style={{ textDecoration: 'none' }}>
                            <Button variant="secondary" type="button">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>

                </div>
            )}
        </main>
    )
}