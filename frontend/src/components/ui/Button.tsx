import React from 'react'
import { useAccessibility } from '../../context/AccessibilityContext'
import styles from './Button.module.css'

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
    const { isAccessibilityMode } = useAccessibility()

    // Build class list based on variant and fullWidth
    const classList = [
        styles.btn,
        styles[variant],
        !fullWidth ? styles.inline : '',
        isAccessibilityMode ? 'toggle-btn' : '',
    ].join(' ')

    return (
        <button
            type={type}
            onClick={onClick}
            disabled={disabled}
            className={classList}
        >
            {children}
        </button>
    )
}