import { Product } from '@/data/products'

export function filterProducts(
    products: Product[],
    searchText: string,
    selectedCategory: string
): Product[] {
    return products.filter((product) => {
        const matchesSearch = product.name.toLowerCase().includes(searchText.toLowerCase())
        if (selectedCategory === 'all') return matchesSearch
        if (selectedCategory === 'verified') return matchesSearch && product.verified
        return matchesSearch && product.needsTag === selectedCategory
    })
}