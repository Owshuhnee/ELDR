import { products } from '@/data/products'
import Link from 'next/link'

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const product = products.find((product) => product.id === Number(id))
    if (!product) {
        return <div>Product not found</div>
    }
    return (
    <div>
        <h1>{product.name}</h1>
        <p>{product.price}</p>
        <p>{product.description}</p>
        <p>{product.needsTag}</p>
        <Link href="/">Back to products</Link>
    </div>
    )
}