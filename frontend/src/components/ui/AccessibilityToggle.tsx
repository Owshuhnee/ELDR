import { useAccessibility } from "../../context/AccessibilityContext";


export default function AccessibilityToggle() {
    const { isAccessibilityMode, toggleAccessibilityMode } = useAccessibility();

    return (
    <button onClick = {toggleAccessibilityMode}>
        {isAccessibilityMode ? "Accessibility Mode: ON" : "Accessibility Mode: OFF"}
    </button>)
}
