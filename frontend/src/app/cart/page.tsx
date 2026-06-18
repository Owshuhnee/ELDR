'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import Button from '@/components/ui/Button'
import styles from './cart.module.css'

// Describes the shape of each cart item from the backend
interface CartItem {
  id:         number
  product_id: number
  name:       string
  price:      number
  quantity:   number
}

export default function CartPage() {

  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading]     = useState(true)
  const [error, setError]         = useState('')

  // Fetch cart items when the page loads
  useEffect(() => {
    fetchCart()
  }, [])

  const fetchCart = async () => {
    try {
      // Get the logged-in user from localStorage
      const stored = localStorage.getItem('user')
      if (!stored) {
        window.location.href = '/login'
        return
      }
      const user = JSON.parse(stored)

      const res = await fetch(`http://localhost:5000/api/cart/${user.id}`, {
        credentials: 'include'
      })
      const data = await res.json()

      if (res.ok) {
        setCartItems(data.cart || [])
      } else {
        setError(data.error || 'Could not load cart')
      }
    } catch {
      setError('Could not connect to server')
    } finally {
      setLoading(false)
    }
  }

  const handleRemove = async (itemId: number) => {
    try {
      const res = await fetch(`http://localhost:5000/api/cart/remove/${itemId}`, {
        method:      'DELETE',
        credentials: 'include'
      })
      if (res.ok) {
        // Remove the item from state so the UI updates immediately
        setCartItems(cartItems.filter(item => item.id !== itemId))
      }
    } catch {
      setError('Could not remove item')
    }
  }

  const handleQuantityChange = async (itemId: number, change: number) => {
    // Update quantity in state immediately for responsive UI
    setCartItems(cartItems.map(item =>
      item.id === itemId
        ? { ...item, quantity: Math.max(1, item.quantity + change) }
        : item
    ))
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)

  if (loading) return <p style={{ padding: '24px' }}>Loading cart...</p>

  return (
    <main className={styles.page}>

      <h1 className={styles.title}>Your Cart</h1>

      {error && <p style={{ color: 'red', padding: '12px' }}>{error}</p>}

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