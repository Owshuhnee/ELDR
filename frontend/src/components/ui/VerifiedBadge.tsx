export default function VerifiedBadge() {
    return (
        <span
            aria-label="ELDR Verified product"
            style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '4px',
                border: '1.5px solid var(--color-trust-green)',
                color: 'var(--color-trust-green)',
                borderRadius: '999px',
                padding: '2px 10px',
                fontSize: '13px',
                fontWeight: 600,
                lineHeight: 1.6,
            }}
        >
            <span aria-hidden="true">✓</span>
            ELDR Verified
        </span>
    )
}
