import { filterProducts } from '../lib/filterProducts'
import type { Product } from '../data/products'

const mockProducts: Product[] = [
  { id: 1, name: 'Walking Frame', price: 120, description: 'A sturdy frame', needsTag: 'mobility', verified: true },
  { id: 2, name: 'Magnifying Glass', price: 35, description: 'Helps with reading', needsTag: 'vision', verified: false },
  { id: 3, name: 'Hearing Loop', price: 89, description: 'Assistive hearing device', needsTag: 'hearing', verified: true },
]

describe('filterProducts', () => {
  it('returns all products when search is empty and category is all', () => {
    const result = filterProducts(mockProducts, '', 'all')
    expect(result).toHaveLength(3)
  })
  it('filters by search case-insensitively', () => {
    const result = filterProducts(mockProducts, 'walking', 'all')
    expect(result).toHaveLength(1)
  })
  it('filter products by mobility', () => {
    const result = filterProducts(mockProducts, '', 'mobility')
    expect(result).toHaveLength(1)
  })
  it('filter products by verified', () => {
    const result = filterProducts(mockProducts, '', 'verified')
    expect(result).toHaveLength(2)
  })
  it('filter products by search and category', () => {
    const result = filterProducts(mockProducts, 'hearing', 'hearing')
    expect(result).toHaveLength(1)
  })
  it('filter doesnt match', () => {
    const result = filterProducts(mockProducts, 'asdasd', 'all')
    expect(result).toHaveLength(0)

  })

})
