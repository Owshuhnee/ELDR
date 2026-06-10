'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import Image from 'next/image'

export default function Navbar() {
    const pathname = usePathname()

    return (
       <div>
            {/* desktop navbar */}
            <nav className="desktop-nav" style={{ 
                justifyContent: 'space-between',
                alignItems: 'center',
                backgroundColor: 'var(--color-nav-bg)',
                padding: '0 2rem',
                height: '64px',
                borderBottom: '1px solid var(--color-nav-border)'
            }}>
                    <Image src='/ELDR-logo-1.jpg' alt='ELDR logo' width={80} height={40} />
                     <div style={{ display: 'flex', gap: '2rem' }}>
                        <Link
                            href="/"
                            style={{
                                color: pathname === "/" ? 'var(--color-nav-active)' : 'var(--color-nav-text)'
                            }}
                        >

                        Home
                        </Link>

                        <Link
                            href="/browse"
                            style={{
                                color: pathname === "/browse" ? 'var(--color-nav-active)' : 'var(--color-nav-text)'
                            }}               
                        >
                            Browse
                        </Link>
                        <Link
                            href="/cart"
                            style={{
                                color: pathname === "/cart" ? 'var(--color-nav-active)' : 'var(--color-nav-text)'
                            }}    
                            >
                            Cart
                        </Link>
                        <Link
                        href="/account"
                            style={{
                                color: pathname === "/account" ? 'var(--color-nav-active)' : 'var(--color-nav-text)'
                            }}    
                        >
                        Account
                        </Link>
                    </div>
            </nav>
  

            {/* mobile navbar */}
            <nav className="mobile-nav">
                <Link
                    href="/"
                    style={{
                        color: pathname === "/" ? 'var(--color-nav-active)' : 'var(--color-nav-text)'
                    }}
                >
                Home
                </Link>
                <Link
                    href="/browse"
                    style={{
                        color: pathname === "/browse" ? 'var(--color-nav-active)' : 'var(--color-nav-text)'
                    }}               
                >
                    Browse
                </Link>
                <Link
                    href="/cart"
                    style={{
                        color: pathname === "/cart" ? 'var(--color-nav-active)' : 'var(--color-nav-text)'
                    }}    
                    >
                    Cart
                </Link>
                <Link
                href="/account"
                    style={{
                        color: pathname === "/account" ? 'var(--color-nav-active)' : 'var(--color-nav-text)'
                    }}    
                >
                Account
                </Link>
            </nav>
        </div>
    )
}
