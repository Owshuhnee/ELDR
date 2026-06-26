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

    const [reviews, setReviews]       = useState<Review[]>([])
    const [loading, setLoading]       = useState(true)
    const [error, setError]           = useState<string | null>(null)
    const [rating, setRating]         = useState<number>(0)
    const [comment, setComment]       = useState<string>('')
    const [submitting, setSubmitting] = useState(false)
    const [submitError, setSubmitError] = useState<string | null>(null)
    const [submitSuccess, setSubmitSuccess] = useState(false)
    const [refreshCount, setRefreshCount] = useState(0)

    // Read the user from localStorage — same pattern as the rest of the frontend
    const stored = typeof window !== 'undefined' ? localStorage.getItem('user') : null
    const currentUser = stored ? JSON.parse(stored) : null

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
    }, [productId, refreshCount])

        async function handleSubmitReview() {
        if (rating === 0) {
            setSubmitError('Please select a star rating.')
            return
        }
        setSubmitting(true)
        setSubmitError(null)

        try {
            const res = await fetch(`http://localhost:5000/api/reviews/${productId}`, {
                method: 'POST',
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ rating, comment })
            })
            const data = await res.json()

            if (res.status === 409) {
                // 409 means duplicate — user already reviewed this product
                setSubmitError('You have already reviewed this product.')
                return
            }
            if (!res.ok) {
                setSubmitError(data.error || 'Could not submit review.')
                return
            }

            // Success — reset form and refresh the reviews list
            setSubmitSuccess(true)
            setRating(0)
            setComment('')
            // Trigger a re-fetch by calling fetchReviews again
            // We do this by toggling a refresh counter
            setRefreshCount(c => c + 1)

        } catch {
            setSubmitError('Could not connect to server.')
        } finally {
            setSubmitting(false)
        }
    }

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

            {/* Review form */}
            <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid #E8E8E8' }}>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-text)', marginBottom: '1rem' }}>
                    Leave a Review
                </h3>

                {!currentUser ? (
                    <p style={{ fontSize: '16px', color: 'var(--color-text-muted)' }}>
                        <a href="/login" style={{ color: 'var(--color-primary)', fontWeight: 600 }}>
                            Log in
                        </a>{' '}to leave a review.
                    </p>
                ) : submitSuccess ? (
                    <p style={{ fontSize: '16px', color: '#4A7C59', fontWeight: 600 }}>
                        ✓ Review submitted. Thank you!
                    </p>
                ) : (
                    <>
                        <div style={{ display: 'flex', gap: '8px', marginBottom: '1rem' }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    style={{
                                        fontSize: '28px',
                                        background: 'none',
                                        border: 'none',
                                        cursor: 'pointer',
                                        color: star <= rating ? '#4A7C59' : '#CCCCCC',
                                        padding: '0',
                                        lineHeight: 1,
                                    }}
                                >
                                    ★
                                </button>
                            ))}
                        </div>

                        <textarea
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="Share your experience with this product (optional)"
                            rows={4}
                            style={{
                                width: '100%',
                                fontSize: '16px',
                                padding: '0.75rem',
                                borderRadius: '8px',
                                border: '1px solid #CCCCCC',
                                fontFamily: 'inherit',
                                resize: 'vertical',
                                boxSizing: 'border-box' as const,
                                marginBottom: '0.75rem',
                            }}
                        />

                        {submitError && (
                            <p style={{ fontSize: '15px', color: '#CC0000', marginBottom: '0.5rem' }}>
                                {submitError}
                            </p>
                        )}

                        <button
                            onClick={handleSubmitReview}
                            disabled={submitting}
                            style={{
                                backgroundColor: 'var(--color-primary)',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '24px',
                                padding: '12px 32px',
                                fontSize: '16px',
                                fontWeight: 600,
                                cursor: submitting ? 'not-allowed' : 'pointer',
                                opacity: submitting ? 0.7 : 1,
                                minHeight: '48px',
                            }}
                        >
                            {submitting ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}