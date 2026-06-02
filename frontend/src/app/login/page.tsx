// LOGIN PAGE
import Button from '@/components/ui/Button'
import InputField from '@/components/ui/InputField'
import AuthCard from '@/components/ui/AuthCard'

export default function LoginPage() {
    return (
    <AuthCard>
        {/* ELDER LOGO placeholder */}
        <div style={{
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-border)',
            margin: '0 auto 40px',
        }} />

        {/* INPUT FIELD */}  
            <InputField label="Username" id="username" name="username" />
            <InputField label="Password" type="password" id="password" name="password" />

        {/* BUTTONS */}  
            <Button variant="primary" type="submit">Login</Button>
            <Button variant="secondary">Login as Guest</Button>

        <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: '24px',
        }}>
            <a href="#">Forgot password?</a>
            <a href="/register">Create Account</a>
        </div>
    </AuthCard>
)
}