'use client'

import { useState } from 'react'
import styles from './WishlistPage.module.css'

interface WishlistItem {
  id: number
  name: string
  price: number
  image: string
  category: string
}

const mockWishlist: WishlistItem[] = [
  { id: 1, name: 'Ergonomic Grip Mug',  price: 24.99, image: '', category: 'Daily Living' },
  { id: 2, name: 'Large Button Remote', price: 39.99, image: '', category: 'Vision' },
  { id: 3, name: 'Non-Slip Bath Mat',   price: 34.99, image: '', category: 'Mobility' },
]

export default function WishlistPage() {

  // useState with an array this time.
  // WishlistItem[] means "an array of WishlistItem objects"
  const [items, setItems] = useState<WishlistItem[]>(mockWishlist)

  // Removes an item by filtering out the one whose id matches.
  // .filter() returns a new array containing only items where the condition is true.
  // Think of it as: "keep everything EXCEPT the item I just tapped the heart on"
  function handleRemove(id: number) {
    setItems(items.filter((item) => item.id !== id))
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>

        <h1 className={styles.pageTitle}>My Wishlist</h1>

        {/* ── Empty state ── */}
        {/* If items.length is 0 (empty array), render the empty state */}
        {/* Otherwise render the item list */}
        {/* This is a ternary: condition ? "if true" : "if false" */}
        {items.length === 0 ? (
          <div className={styles.emptyState}>
            <span className={styles.emptyIcon}>♡</span>
            <p className={styles.emptyTitle}>Your wishlist is empty</p>
            <p className={styles.emptySubtitle}>
              Browse our products and tap the heart icon to save items here.
            </p>
            <a href="/browse" className={styles.browseButton}>
              Browse Products
            </a>
          </div>
        ) : (
          <div className={styles.itemList}>
            {items.map((item) => (
              <div key={item.id} className={styles.card}>

                {/* Left side — tapping navigates to product detail */}
                <a href={`/products/${item.id}`} className={styles.cardLink}>

                  {/* Image placeholder — replaced with <img> when backend is wired */}
                  <div className={styles.imagePlaceholder} />

                  <div className={styles.cardInfo}>
                    <span className={styles.cardCategory}>{item.category}</span>
                    <p className={styles.cardName}>{item.name}</p>
                    <p className={styles.cardPrice}>${item.price.toFixed(2)}</p>
                  </div>

                </a>

                {/* Heart button — tapping removes from wishlist */}
                {/* onClick passes the item's id to handleRemove */}
                <button
                  className={styles.heartButton}
                  onClick={() => handleRemove(item.id)}
                  aria-label={`Remove ${item.name} from wishlist`}
                >
                  {/* ♥ is a filled heart character */}
                  ♥
                </button>

              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  )
}