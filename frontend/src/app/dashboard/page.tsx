// DASHBOARD PAGE (PLACEHOLDER ONLY)


export default function DashboardPage() {
    return (
        <main style={{
            minHeight: '100vh',
            backgroundColor: 'var(--color-background)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
        }}>
            <div style={{
                textAlign: 'center',
            }}>
                <h1 style={{
                    color: 'var(--color-primary)',
                    fontSize: '32px',
                    marginBottom: '8px',
                }}>
                    Welcome to ELDR
                </h1>
                <p style={{
                    color: 'var(--color-text-muted)',
                    fontSize: '18px',
                }}>
                    You are logged in!
                </p>
            </div>
        </main>
    )
}