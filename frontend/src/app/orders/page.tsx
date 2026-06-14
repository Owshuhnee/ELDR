'use client'

import { useState } from 'react'
import styles from './PurchaseHistory.module.css'

// ── INTERFACES ──
interface OrderItem {
  id: number
  name: string
  quantity: number
  price: number
}

interface Order {
  id: string
  date: string
  status: 'Delivered' | 'Processing' | 'Cancelled'
  total: number
  items: OrderItem[]
}

interface FrequentItem {
  id: number
  name: string
  category: string
  price: number
  // How many times this product has been ordered
  orderCount: number
}

// ── PLACEHOLDER ONLY ──
const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    date: '12 June 2026',
    status: 'Delivered',
    total: 59.98,
    items: [
      { id: 1, name: 'Ergonomic Grip Mug', quantity: 1, price: 24.99 },
      { id: 2, name: 'Non-Slip Bath Mat',  quantity: 1, price: 34.99 },
    ],
  },
  {
    id: 'ORD-002',
    date: '28 May 2026',
    status: 'Delivered',
    total: 39.99,
    items: [
      { id: 3, name: 'Large Button Remote', quantity: 1, price: 39.99 },
    ],
  },
  {
    id: 'ORD-003',
    date: '10 May 2026',
    status: 'Cancelled',
    total: 24.99,
    items: [
      { id: 4, name: 'Ergonomic Grip Mug', quantity: 1, price: 24.99 },
    ],
  },
]

// Sorted by orderCount descending - most ordered appears first
const mockFrequent: FrequentItem[] = [
  { id: 1, name: 'Ergonomic Grip Mug',  category: 'Daily Living', price: 24.99, orderCount: 3 },
  { id: 2, name: 'Non-Slip Bath Mat',   category: 'Mobility',     price: 34.99, orderCount: 2 },
  { id: 3, name: 'Large Button Remote', category: 'Vision',       price: 39.99, orderCount: 1 },
]

// TAB Type, Only 2 Values
type Tab = 'frequent' | 'history'

export default function OrdersPage() {

  // activeTab controls which view is shown.
  // Defaults to 'frequent' as agreed.
  const [activeTab, setActiveTab] = useState<Tab>('frequent')

  // expandedId tracks which order card is open in the history tab.
  const [expandedId, setExpandedId] = useState<string | null>(null)

  function handleToggle(id: string) {
    setExpandedId(expandedId === id ? null : id)
  }

  function getStatusClass(status: Order['status']) {
    if (status === 'Delivered')  return styles.statusDelivered
    if (status === 'Processing') return styles.statusProcessing
    if (status === 'Cancelled')  return styles.statusCancelled
    return styles.statusDelivered
  }

  return (
    <div className={styles.page}>
      <main className={styles.main}>

        <h1 className={styles.pageTitle}>Orders</h1>

        {/* ── Tab switcher ── */}
        {/* Each button sets activeTab, which controls what renders below */}
        <div className={styles.tabRow}>
          <button
            className={activeTab === 'frequent' ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab('frequent')}
          >
            Frequently Bought
          </button>
          <button
            className={activeTab === 'history' ? styles.tabActive : styles.tab}
            onClick={() => setActiveTab('history')}
          >
            Order History
          </button>
        </div>

        {/* ── FREQUENTLY BOUGHT VIEW ── */}
        {activeTab === 'frequent' && (
          <div className={styles.orderList}>
            {mockFrequent.map((item) => (
            <div key={item.id} className={styles.orderCard}>
              <div className={styles.frequentRow}>

                <div className={styles.frequentTop}>
                  <div className={styles.imagePlaceholder} />
                  <div className={styles.frequentInfo}>
                    <span className={styles.frequentCategory}>{item.category}</span>
                    <p className={styles.frequentName}>{item.name}</p>
                    <p className={styles.frequentMeta}>
                      Ordered {item.orderCount} {item.orderCount === 1 ? 'time' : 'times'}
                    </p>
                    <p className={styles.frequentPrice}>${item.price.toFixed(2)}</p>
                  </div>
                </div>

                <button
                  className={styles.reorderButton}
                  onClick={() => console.log(`Reorder ${item.name}`)}
                >
                  Reorder
                </button>

              </div>
            </div>
            ))}
          </div>
        )}

        {/* ── ORDER HISTORY VIEW ── */}
        {activeTab === 'history' && (
          <div className={styles.orderList}>
            {mockOrders.length === 0 ? (
              <div className={styles.emptyState}>
                <span className={styles.emptyIcon}>📦</span>
                <p className={styles.emptyTitle}>No orders yet</p>
                <p className={styles.emptySubtitle}>
                  Your completed purchases will appear here.
                </p>
                <a href="/browse" className={styles.browseButton}>
                  Browse Products
                </a>
              </div>
            ) : (
              mockOrders.map((order) => (
                <div key={order.id} className={styles.orderCard}>

                  <button
                    className={styles.orderHeader}
                    onClick={() => handleToggle(order.id)}
                  >
                    <div className={styles.orderMeta}>
                      <span className={styles.orderId}>{order.id}</span>
                      <span className={styles.orderDate}>{order.date}</span>
                    </div>
                    <div className={styles.orderRight}>
                      <span className={getStatusClass(order.status)}>
                        {order.status}
                      </span>
                      <span className={styles.orderTotal}>
                        ${order.total.toFixed(2)}
                      </span>
                      <span className={expandedId === order.id ? styles.arrowUp : styles.arrowDown}>
                        ▾
                      </span>
                    </div>
                  </button>

                  {expandedId === order.id && (
                    <div className={styles.itemList}>
                      {order.items.map((item) => (
                        <div key={item.id} className={styles.itemRow}>
                          <span className={styles.itemName}>{item.name}</span>
                          <span className={styles.itemQty}>x{item.quantity}</span>
                          <span className={styles.itemPrice}>
                            ${item.price.toFixed(2)}
                          </span>
                        </div>
                      ))}
                      <button className={styles.reorderButton}>
                        Reorder
                      </button>
                    </div>
                  )}

                </div>
              ))
            )}
          </div>
        )}

      </main>
    </div>
  )
}