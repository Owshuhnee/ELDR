// Added a "danger" style variant
import React from 'react'
import { useAccessibility } from '../../context/AccessibilityContext'

type Props = {
    variant: 'primary' | 'secondary' | 'danger'
    children: React.ReactNode
    type?: 'submit' | 'button'
    onClick?: () => void
    disabled?: boolean
    fullWidth?: boolean
}

export default function Button({
    variant,
    children,
    type = 'button',
    onClick,
    disabled = false,
    fullWidth = true,
}: Props) {

    const base: React.CSSProperties = {
        width: fullWidth ? '100%' : 'auto',
        borderRadius: '24px',
        padding: '14px 24px',
        fontSize: '18px',
        fontWeight: 600,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.6 : 1,
        border: 'none',
        transition: 'opacity 0.2s',
        minHeight: '44px',
    }

    const variants: Record<string, React.CSSProperties> = {
        primary: {
            ...base,
            backgroundColor: 'var(--color-primary)',
            color: 'white',
        },
        secondary: {
            ...base,
            backgroundColor: 'transparent',
            color: 'var(--color-primary)',
            border: '1px solid var(--color-border)',
        },
        danger: {
            ...base,
            backgroundColor: 'transparent',
            color: '#721c24',
            border: '1px solid #f5c6cb',
        }
    }

    const { isAccessibilityMode } = useAccessibility()

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            style={variants[variant]}
            className={isAccessibilityMode ? 'a11y-btn' : ''}
        >
            {children}
        </button>
    )
}