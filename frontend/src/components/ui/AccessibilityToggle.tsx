import { useAccessibility } from "../../context/AccessibilityContext";

export default function AccessibilityToggle() {
    const { isAccessibilityMode, toggleAccessibilityMode } = useAccessibility();

    return (
        <button
            aria-pressed={isAccessibilityMode}
            aria-label="Accessibility Mode"
            onClick={toggleAccessibilityMode}
            className="toggle-btn"
            style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '0',
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: '8px',
            }}
        >
            <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-nav-text)' }}>
                Accessibility
            </span>
            <div style={{
                width: '50px',
                height: '26px',
                borderRadius: '999px',
                backgroundColor: isAccessibilityMode ? 'var(--color-trust-green)' : 'rgba(255, 255, 255, 0.25)',
                padding: '3px',
            }}>
                <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '999px',
                    backgroundColor: 'white',
                    transform: isAccessibilityMode ? 'translateX(24px)' : 'translateX(0)',
                    transition: 'transform 0.2s',
                }}>
                </div>
            </div>
        </button>
    )
}
