// ReviewsSection.tsx
// Displays elderly-specific reviews for a single product.

'use client'


import { useState, useEffect } from 'react'

// ─── TYPE DEFINITIONS ─────────────────────────────────────────────────────────
// Describes the shape of one review coming back from the API
interface Review {
    id: number
    rating: number
    comment: string | null
    reviewer: string
    created_at: string | null
}

// Describes the props this component accepts
interface Props {
    productId: string
    // string because useParams() returns strings — matches how Ross reads id
}

// ─── STAR DISPLAY ─────────────────────────────────────────────────────────────
// A small helper function that converts a number (1-5) into star characters
function Stars({ rating }: { rating: number }) {
    
    const filled = '★'.repeat(rating)
    const empty  = '☆'.repeat(5 - rating)
    return (
        <span style={{ color: '#4A7C59', fontSize: '20px', letterSpacing: '2px' }}>
            {filled}{empty}
        </span>
    )
}

// ─── MAIN COMPONENT ───────────────────────────────────────────────────────────
export default function ReviewsSection({ productId }: Props) {

    const [reviews, setReviews]   = useState<Review[]>([])
    const [loading, setLoading]   = useState(true)
    const [error, setError]       = useState<string | null>(null)

    useEffect(() => {
        // Re-runs if productId changes — so navigating between product pages
        // triggers a fresh fetch rather than showing the previous product's reviews
        async function fetchReviews() {
            try {
                const res = await fetch(
                    `http://localhost:5000/api/reviews/${productId}`,
                    { credentials: 'include' }
                )
                // Template literal — backtick string that embeds ${productId}
                // at runtime. Equivalent to 'http://.../' + productId

                if (!res.ok) {
                    setError('Could not load reviews.')
                    return
                }

                const data = await res.json()
                setReviews(data.reviews)
                // data.reviews matches the key your Flask endpoint returns:
                // return jsonify({'reviews': result, 'count': len(result)})

            } catch {
                setError('Could not load reviews.')
            } finally {
                setLoading(false)
            }
        }

        fetchReviews()
    }, [productId])


    // ─── RENDER ───────────────────────────────────────────────────────────────
    return (
        <div style={{ marginTop: '3rem', borderTop: '1px solid #E8E8E8', paddingTop: '2rem' }}>

            <h2 style={{ fontSize: '22px', fontWeight: 700, color: 'var(--color-text)', marginBottom: '1.5rem' }}>
                Elderly Shopper Reviews {!loading && `(${reviews.length})`}
            </h2>
            {/* !loading && `(${reviews.length})` — only show the count once
                loading is done. && short-circuits: if left is false, right is skipped */}

            {loading && (
                <p style={{ fontSize: '18px', color: 'var(--color-text-muted)' }}>
                    Loading reviews…
                </p>
            )}

            {error && (
                <p style={{ fontSize: '18px', color: '#CC0000' }}>
                    {error}
                </p>
            )}

            {!loading && !error && reviews.length === 0 && (
                <p style={{ fontSize: '18px', color: 'var(--color-text-muted)' }}>
                    No reviews yet for this product.
                </p>
            )}
            {/* !loading && !error && reviews.length === 0 — all three must be
                true before showing "No reviews". We do not want to flash this
                message while the fetch is still in progress */}

            {reviews.map((review) => (
                <div
                    key={review.id}
                    // key is required when rendering a list in React.
                    // React uses it to track which items changed between renders.
                    // Always use a unique ID from the data — never use array index.
                    style={{
                        backgroundColor: '#F9F9F7',
                        borderRadius: '12px',
                        padding: '1.25rem 1.5rem',
                        marginBottom: '1rem',
                        borderLeft: '4px solid #4A7C59',
                    }}
                >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                        <Stars rating={review.rating} />
                        <span style={{ fontSize: '15px', color: 'var(--color-text-muted)' }}>
                            {review.reviewer}
                            {review.created_at && (
                                ` · ${new Date(review.created_at).toLocaleDateString('en-NZ', { year: 'numeric', month: 'long', day: 'numeric' })}`
                            )}
                            {/* new Date(review.created_at) converts the ISO string
                                "2026-06-01T10:30:00+00:00" into a JavaScript Date object.
                                .toLocaleDateString formats it as "1 June 2026" using NZ locale */}
                        </span>
                    </div>

                    {review.comment && (
                        <p style={{ fontSize: '17px', color: 'var(--color-text)', marginTop: '0.75rem', lineHeight: 1.6, marginBottom: 0 }}>
                            {review.comment}
                        </p>
                    )}
                    {/* review.comment && (...) — only renders the paragraph if
                        comment is not null. A review with no comment just shows stars */}
                </div>
            ))}
        </div>
    )
}