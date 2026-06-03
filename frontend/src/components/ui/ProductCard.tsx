import Button from '@/components/ui/Button';

type Product = {
    id: number;
    name: string;
    price: number;
    description: string;
    needsTag: string;
}

type Props = {
    product: Product;
}

export default function ProductCard({ product }: Props) {
    return <article style={{
        backgroundColor: 'var(--color-surface)',
        borderRadius: '12px',
        border: '1px solid var(--color-border)',
        boxShadow:'0 2px 8px rgba(0,0,0,0.08)',
    }}>
        <img src="https://placehold.co/400x220" alt={product.name} style={{
                    width: '100%',
                    display: 'block'

        }}/>
        <div style={{
            padding: '30px',
            position: 'relative'
        }}>
            <p style={{
                fontSize: '18px',
                fontWeight: '600',
                color: 'var(--color-primary)'
            }}>
                {product.name}
            </p>
            <p style={{
                fontSize: '24px',
                fontWeight: 700,
                color: 'var(--color-text)'
            }}>
                {`$${product.price.toFixed(2)}`}
            </p>
            <p style={{
                marginBottom: '40px',
            }}>
                {product.description}
            </p>
            <p style={{
                backgroundColor: 'var(--color-accent)',
                color: 'white',
                borderRadius: '999px',
                padding: '0.25rem 0.75rem',
                fontSize: '12px',
                display: 'inline-block',
                position: 'absolute',
                top: '16px',
                right: '16px',

            }}>
                {product.needsTag}
            </p>
            <div style={{
                display: 'flex',
                gap: '12px',
            }}>
                <div style={{
                    flexGrow: 1
                }}>
                    <Button variant="primary">Add to Cart</Button>
                </div>
                <button aria-label="Add to wishlist" style={{
                    border: '1px solid var(--color-border)',
                    borderRadius: '15px',
                    padding: '15px',
                    minHeight: '44px',
                    minWidth: '44px',
                }}>♡</button>
                
            </div>
        </div>
        
    </article>
}