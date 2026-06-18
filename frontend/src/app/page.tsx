'use client';

import ProductCard from '@/components/ui/ProductCard';
import { useState, useEffect } from 'react';
import { useAccessibility } from '../context/AccessibilityContext'
import type { Product } from '@/data/products'

const filterOptions = [
  { label: 'Mobility',    value: 'mobility' },
  { label: 'Visual Aid',  value: 'vision' },
  { label: 'Hearing',     value: 'hearing' },
  { label: 'Daily Living',value: 'daily living' },
  { label: 'Verified',    value: 'verified' },
]

const FilterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
    <circle cx="8" cy="8" r="2.5"/>
    <line x1="8" y1="1" x2="8" y2="5.5"/>
    <line x1="8" y1="10.5" x2="8" y2="15"/>
    <line x1="1" y1="8" x2="5.5" y2="8"/>
    <line x1="10.5" y1="8" x2="15" y2="8"/>
  </svg>
)

export default function Home() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [searchText, setSearchText] = useState('')
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const { isAccessibilityMode } = useAccessibility()

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then((res) => res.json())
      .then((data) => {
        const mapped = data.products.map((item: any) => ({
          id: item.id,
          name: item.title,
          price: item.price,
          description: item.description,
          needsTag: item.category.replace('_', ' '),
          verified: item.is_verified,
        }))
        setProducts(mapped)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to load products')
        setLoading(false)
      })
  }, [])

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase())
    if (selectedCategory === 'all') return matchesSearch
    if (selectedCategory === 'verified') return matchesSearch && product.verified
    return matchesSearch && product.needsTag === selectedCategory
  })

  if (loading) {
    return <p style={{ padding: '2rem', fontSize: '18px' }}>Loading products…</p>
  }

  if (error) {
    return <p style={{ padding: '2rem', fontSize: '18px', color: 'red' }}>{error}</p>
  }

  const activeLabel = filterOptions.find(f => f.value === selectedCategory)?.label ?? null

  const filterBtnStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    height: '48px',
    padding: '0 20px',
    borderRadius: '999px',
    border: '1.5px solid var(--color-border)',
    backgroundColor: isFilterOpen || selectedCategory !== 'all'
      ? 'var(--color-primary)'
      : 'var(--color-surface)',
    color: isFilterOpen || selectedCategory !== 'all' ? '#ffffff' : 'var(--color-text)',
    fontSize: '16px',
    fontWeight: 500,
    cursor: 'pointer',
    whiteSpace: 'nowrap',
  }

  const optionBtnStyle = (value: string) => ({
    padding: '10px 16px',
    borderRadius: '999px',
    border: '1.5px solid var(--color-border)',
    backgroundColor: selectedCategory === value ? 'var(--color-primary)' : 'transparent',
    color: selectedCategory === value ? '#ffffff' : 'var(--color-text)',
    fontSize: '15px',
    cursor: 'pointer',
    fontWeight: 500,
    width: '100%',
  })

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>

      {/* Search + Filter row */}
      <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '1.5rem' }}>
        <input
          onChange={(e) => setSearchText(e.target.value)}
          type="search"
          value={searchText}
          placeholder="Search products..."
          style={{
            flex: 1,
            height: '48px',
            padding: '0 20px',
            borderRadius: '999px',
            border: '1.5px solid var(--color-border)',
            backgroundColor: 'var(--color-surface)',
            fontSize: '16px',
            color: 'var(--color-text)',
          }}
        />

        <div style={{ position: 'relative' }}>
          <button style={filterBtnStyle} onClick={() => setIsFilterOpen(prev => !prev)}>
            <FilterIcon />
            {activeLabel ?? 'Filter'}
          </button>

          {isFilterOpen && (
            <div style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              backgroundColor: 'var(--color-surface)',
              border: '1.5px solid var(--color-border)',
              borderRadius: '16px',
              padding: '12px',
              display: 'flex',
              flexDirection: 'column',
              gap: '8px',
              minWidth: '200px',
              zIndex: 50,
              boxShadow: '0 4px 20px rgba(0,0,0,0.10)',
            }}>
              <button style={optionBtnStyle('all')} onClick={() => { setSelectedCategory('all'); setIsFilterOpen(false) }}>
                All
              </button>
              {filterOptions.map((opt) => (
                <button
                  key={opt.value}
                  style={optionBtnStyle(opt.value)}
                  onClick={() => { setSelectedCategory(opt.value); setIsFilterOpen(false) }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Product grid */}
      <div className="product-grid" style={{
        display: 'grid',
        gridTemplateColumns: isAccessibilityMode ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
        gap: '1.5rem',
      }}>
        {filteredProducts.length === 0 ? (
          <p style={{ color: 'var(--color-text-muted)' }}>No results found.</p>
        ) : (
          filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </main>
  );
}
