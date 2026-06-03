// LOGIN PAGE BUTTONS (Can be resuable?)

type Props = {
    variant: 'primary' | 'secondary';
    children: string;
    type?: 'submit' | 'button';
    onClick?: () => void;
}

export default function Button({ variant, children, type = 'button', onClick }: Props) {

    const baseStyle = {
        width: '100%',
        borderRadius: '24px',
        padding: '16px',
        fontSize: '18px',
        cursor: 'pointer',
    }

    const styles = {
        primary: {
            ...baseStyle,
            backgroundColor: 'var(--color-primary)',
            color: 'white',
            border: 'none',
        },
        secondary: {
            ...baseStyle,
            backgroundColor: 'transparent',
            color: 'var(--color-primary)',
            border: '1px solid var(--color-border)',
        }
    }

    return (
        <button type={type} onClick={onClick} style={styles[variant]}>
            {children}
        </button>
    )
}