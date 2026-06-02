// AUTH CARD for login and register

type Props = {
    children: React.ReactNode
}

export default function AuthCard({ children }: Props) {
    return (
        <main style={{
            minHeight: '100vh',
            backgroundColor: 'var(--color-background)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{
                width: '100%',
                maxWidth: '400px',
                padding: '40px',
            }}>
                {children}
            </div>
        </main>
    )
}