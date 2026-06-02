// LOGIN PAGE
import Button from '@/components/ui/Button'
import InputField from '@/components/ui/InputField'

export default function LoginPage() {
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

                {/* ELDER LOGO placeholder */}
                <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-border)',
                    margin: '0 auto 40px',
                }} />

                <InputField label="Username" id="username" name="username" />
                <InputField label="Password" type="password" id="password" name="password" />

                {/* Buttons */}    
                <Button variant="primary" type="submit">Login</Button>
                <Button variant="secondary">Login as Guest</Button>

                {/* Bottom links */}
                <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '24px',
                }}>
                    <a href="#">Forgot password?</a>
                    <a href="/register">Create Account</a>
                </div>

            </div>
        </main>
    )
}