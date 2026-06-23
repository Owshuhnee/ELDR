'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import AccessibilityToggle from './AccessibilityToggle'
import { useState, useEffect } from 'react'


const HomeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2.5 8.5L10 2.5l7.5 6V17a1 1 0 01-1 1H13v-4.5H7V18H3.5a1 1 0 01-1-1V8.5z"/>
    </svg>
)

const BrowseIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="2" width="6.5" height="6.5" rx="1"/>
        <rect x="11.5" y="2" width="6.5" height="6.5" rx="1"/>
        <rect x="2" y="11.5" width="6.5" height="6.5" rx="1"/>
        <rect x="11.5" y="11.5" width="6.5" height="6.5" rx="1"/>
    </svg>
)

const CartIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M1.5 1.5h2.5l2 9h9.5l2-7H5.5"/>
        <circle cx="8" cy="16.5" r="1.5"/>
        <circle cx="14.5" cy="16.5" r="1.5"/>
    </svg>
)

const AccountIcon = () => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="10" cy="7" r="3.5"/>
        <path d="M2 18.5c0-4.4 3.6-8 8-8s8 3.6 8 8"/>
    </svg>
)

export default function Navbar() {
    const pathname = usePathname()
    const [isAdmin, setIsAdmin] = useState(false)

    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user') || '{}')
        setIsAdmin(user.role === 'admin')
    }, [])


    if (pathname === '/login' || pathname === '/register') return null

    return (
        <div>
            {/* Desktop navbar */}
            <nav className="desktop-nav" style={{
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'var(--color-nav-bg)',
                color: 'var(--color-nav-text)',
                padding: '0 2rem',
                height: '64px',
                borderBottom: '1px solid var(--color-nav-border)',
            }}>
                <span style={{
                    fontWeight: 700,
                    fontSize: '22px',
                    color: 'var(--color-nav-text)',
                    letterSpacing: '0.08em',
                }}>
                    ELDR
                </span>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                    <Link href="/" style={{
                        color: pathname === "/" ? 'var(--color-nav-active)' : 'var(--color-nav-text)',
                        textDecoration: 'none',
                        fontWeight: 500,
                    }}>Home</Link>
                    <Link href="/cart" style={{
                        color: pathname === "/cart" ? 'var(--color-nav-active)' : 'var(--color-nav-text)',
                        textDecoration: 'none',
                        fontWeight: 500,
                    }}>Cart</Link>
                    <Link href="/account" style={{
                        color: pathname === "/account" ? 'var(--color-nav-active)' : 'var(--color-nav-text)',
                        textDecoration: 'none',
                        fontWeight: 500,
                    }}>Account</Link>
                    {isAdmin && (
                        <Link href="/admin" style={{
                            color: pathname === "/admin" ? 'var(--color-nav-active)' : 'var(--color-nav-text)',
                            textDecoration: 'none',
                            fontWeight: 500,
                        }}>Admin</Link>
                    )}
                    <AccessibilityToggle />
                </div>
            </nav>

            {/* Mobile top header */}
            <div className="mobile-header">
                <span style={{
                    fontWeight: 700,
                    fontSize: '22px',
                    color: 'var(--color-nav-text)',
                    letterSpacing: '0.08em',
                }}>
                    ELDR
                </span>
                <AccessibilityToggle />
            </div>

            {/* Mobile bottom nav */}
            <nav className="mobile-nav">
                <Link href="/" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px',
                    color: pathname === "/" ? 'var(--color-nav-active)' : 'var(--color-nav-text-inactive)',
                    textDecoration: 'none',
                    fontSize: '11px',
                    minHeight: '44px',
                    justifyContent: 'center',
                    padding: '0 12px',
                }}>
                    <HomeIcon />
                    <span>Home</span>
                </Link>
                <Link href="/" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px',
                    color: 'var(--color-nav-text-inactive)',
                    textDecoration: 'none',
                    fontSize: '11px',
                    minHeight: '44px',
                    justifyContent: 'center',
                    padding: '0 12px',
                }}>
                    <BrowseIcon />
                    <span>Browse</span>
                </Link>
                <Link href="/cart" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px',
                    color: pathname === "/cart" ? 'var(--color-nav-active)' : 'var(--color-nav-text-inactive)',
                    textDecoration: 'none',
                    fontSize: '11px',
                    minHeight: '44px',
                    justifyContent: 'center',
                    padding: '0 12px',
                }}>
                    <CartIcon />
                    <span>Cart</span>
                </Link>
                <Link href="/account" style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px',
                    color: pathname === "/account" ? 'var(--color-nav-active)' : 'var(--color-nav-text-inactive)',
                    textDecoration: 'none',
                    fontSize: '11px',
                    minHeight: '44px',
                    justifyContent: 'center',
                    padding: '0 12px',
                }}>
                    <AccountIcon />
                    <span>Account</span>
                </Link>
            </nav>
        </div>
    )
}
