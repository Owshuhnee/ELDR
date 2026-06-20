import Link from 'next/link'
import VerifiedBadge from '@/components/ui/VerifiedBadge';

type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    needsTag: string;
    verified: boolean;
    image?: string;
}

type Props = {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    return (
        <article style={{
            backgroundColor: 'var(--color-surface)',
            borderRadius: '12px',
            border: '1px solid var(--color-border)',
            boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
            overflow: 'hidden',
        }}>
            <img
                src={product.image ?? 'https://placehold.co/400x220'}
                alt={product.name}
                style={{ width: '100%', height: '220px', objectFit: 'cover', display: 'block' }}
            />

            <div style={{ padding: '20px 24px 24px' }}>
                <p style={{
                    fontSize: '18px',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    marginBottom: '4px',
                    textDecoration: 'none',
                }}>
                    <Link href={`/product/${product.id}`} style={{ color: 'inherit', textDecoration: 'none' }}>
                        {product.name}
                    </Link>
                </p>

                {product.verified && (
                    <div style={{ marginBottom: '8px' }}>
                        <VerifiedBadge />
                    </div>
                )}

                <p style={{
                    color: 'var(--color-text-muted)',
                    fontSize: '15px',
                    marginBottom: '12px',
                    lineHeight: 1.5,
                }}>
                    {product.description}
                </p>

                <p style={{
                    fontSize: '22px',
                    fontWeight: 700,
                    color: 'var(--color-text)',
                    marginBottom: '20px',
                }}>
                    ${product.price.toFixed(2)}
                </p>

                <Link
                    href={`/product/${product.id}`}
                    style={{
                        display: 'block',
                        textAlign: 'center',
                        textDecoration: 'none',
                        backgroundColor: 'var(--color-primary)',
                        color: '#ffffff',
                        borderRadius: '24px',
                        padding: '14px 24px',
                        fontSize: '16px',
                        fontWeight: 600,
                        minHeight: '44px',
                    }}
                >
                    More Information
                </Link>
            </div>
        </article>
    )
}
