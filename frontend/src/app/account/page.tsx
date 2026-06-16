'use client'

import { useState } from 'react'
import styles from './AccountPage.module.css'
import Link from 'next/link'
import Button from '@/components/ui/Button'

// TSX BLUEPRINT
interface User {
  name: string
  email: string
  role: string
  helperName: string
  helperRole: string
}

// PLACEHOLDER DATA - Pending backend&database 
const mockUser: User = {
  name:         'Margaret T.',
  email:        'margaret@example.com',
  role:         'Elder',
  helperName:   'Sarah M.',
  helperRole:   'Caregiver Access',
}

// BUTTONS
const menuItems = [
  { label: 'Wishlist',              href: '/wishlist' },
  { label: 'Orders',                href: '/orders' },
  { label: 'Manage Caregiver',  href: '/caregiver' },
  { label: 'Settings',              href: '/account/settings' },
]


// PAGE COMPONENT
export default function AccountPage() {
  const [user] = useState<User>(mockUser)

  function handleLogout() {
    console.log('Logout clicked — will call /api/auth/logout later')
  }

  return (
  <div className={styles.page}>
    <main className={styles.main}>
      <h1 className={styles.pageTitle}>Account Settings</h1>

      {/* ── Avatar + identity ── */}
      <div className={styles.avatar} />

      <div className={styles.identity}>
        <p className={styles.userName}>{user.name}</p>
        <span className={styles.roleBadge}>{user.role}</span>
      </div>

      {/* ── Caregiver card — only renders if helperName is not empty ── */}
      {/* The && operator means: "if left side is truthy, render right side" */}
      {/* If helperName is '', the whole block is skipped entirely */}
      
      {user.helperName && (
        <div className={styles.helperCard}>
          <p className={styles.helperText}>
            Linked Helper:<br />
            <strong>{user.helperName}</strong><br />
            {user.helperRole}
          </p>
        </div>
      )}

     <div className={styles.menuList}>
        {menuItems.map((item) => (
            <Link key={item.label} href={item.href} style={{ textDecoration: 'none' }}>
                <Button variant="secondary">{item.label}</Button>
            </Link>
        ))}
     </div>

        <Button variant="danger" onClick={handleLogout}>
        Logout
    </Button>
    </main>
  </div>    
)
}