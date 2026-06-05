

'use client';

import ProductCard from '@/components/ui/ProductCard';
import { useState } from 'react';
import { products } from '@/data/products'

export default function Home() {

  const [selectedCategory, setSelectedCategory] = useState('all') // sets a filter for cateory
  const [searchText, setSearchText ] = useState('') // sets a filter for search

    const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === 'all' || product.needsTag === selectedCategory;
    // passes if 'all' is selected, or if product tag matches selected category
    const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase())
    // checks if product name contains the search input (case-insensitive)
    return matchesCategory && matchesSearch;
    // product only shows if both conditions are true
  });

  return (
    <main
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '2rem 1.5rem',
      }}
    >
      <header style={{ marginBottom: '2rem' }}>
        <h1
          style={{
            fontSize: '2rem',
            fontWeight: 700,
            color: 'var(--color-primary)',
          }}
        >
          ELDR Marketplace
        </h1>
        <p style={{ color: 'var(--color-text-muted)', marginTop: '0.5rem' }}>
          Products to support independent living
        </p>
      </header>

      <div>
        <input onChange={(e) => setSearchText(e.target.value)}
          type="search"
          value={searchText}
          placeholder="Search products..."
          />
        {/* when something is typed, grab the event and look at the element that fired it and get its current value */}
      </div>

      <div style={{ display: 'flex', gap: '12px', marginBottom: '2rem', flexWrap: 'wrap' }}>
        {['all', 'mobility', 'vision', 'hearing', 'daily living'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: '10px 20px',
              borderRadius: '24px',
              border: '2px solid var(--color-primary)',
              backgroundColor: selectedCategory === cat ? 'var(--color-primary)' : 'transparent',
              color: selectedCategory === cat ? 'white' : 'var(--color-primary)',
              fontSize: '16px',
              cursor: 'pointer',
              textTransform: 'capitalize',
              fontWeight: '600',
            }}
          >
            {cat === 'all' ? 'All' : cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: '3.0rem'


      }}>
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}

 
      </div>
    </main>
  );
}
