export default function VerifiedBadge() {
    return (
        <span aria-label="Verified product"
        style={{
            backgroundColor: "var(--color-primary)",
            color: "white",
            padding: "4px",
            borderRadius: "999px",
            fontSize: "18px",
         }}>
            <span aria-hidden="true">✓</span>
            Verified
        </span>
    )
}