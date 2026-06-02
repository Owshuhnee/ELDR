

'use client';

import ProductCard from '@/components/ProductCard';
import { useState } from 'react';

export default function Home() {

  const [selectedCategory, setSelectedCategory] = useState('all')

  const products = [
    { id: 1, name: "walking device", price: 30, description: "help with walking", needsTag: "mobility" },
    { id: 2, name: "hearing aid", price: 15, description: "help with hearing", needsTag: "hearing"},
    { id: 3, name: "bottle opener", price: 10, description: "help with convenience", needsTag: "daily living"},
    { id: 4, name: "easy door handle", price: 20, description: "help with opening doors", needsTag: "daily living"},
    { id: 5, name: "staircase roller", price: 20, description: "help with walking up stairs", needsTag: "mobility"},
    { id: 6, name: "magnifying glass", price: 10, description: "help with viewing", needsTag: "vision"},
  ]

  let filteredProducts;
  
  if (selectedCategory === 'all') {
  filteredProducts = products;
  } else {
    filteredProducts = products.filter((product) => product.needsTag === selectedCategory);
  }


  const activeStyle = {
    backgroundColor: 'var(--color-accent)',
    color: 'white',
  }

  const inactiveStyle = {
    backgroundColor: 'transparent',
  }


  
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

      <div style={selectedCategory === 'all' ? activeStyle : inactiveStyle}




      >
        <button onClick={() => setSelectedCategory('all')}>All</button>
        <button onClick={() => setSelectedCategory('mobility')}>Mobility</button>
        <button onClick={() => setSelectedCategory('vision')}>Vision</button>
        <button onClick={() => setSelectedCategory('hearing')}>Hearing</button>
        <button onClick={() => setSelectedCategory('daily living')}>Daily Living</button>

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
