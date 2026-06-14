import { useAccessibility } from "../../context/AccessibilityContext";

export default function AccessibilityToggle() {
    const { isAccessibilityMode, toggleAccessibilityMode } = useAccessibility();

    return (
        <button aria-pressed={isAccessibilityMode} onClick = {toggleAccessibilityMode}>
            <div className="outButton" style={{
                width: '50px',
                height: '22px',
                borderRadius: '999px',
                backgroundColor: isAccessibilityMode ? 'var(--color-primary)' : 'var(--color-border)',
                padding: '2px',
            }}>
                <div className="whiteCircle" style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '999px',
                    backgroundColor: 'white',
                    marginLeft: isAccessibilityMode ? '28px' : '0px',
                }}>
                </div>
            </div>
            <span>
                Accessibility
            </span>
        </button>
        )
}
