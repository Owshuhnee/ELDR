// REGISTER PAGE
import Button from '@/components/ui/Button'
import InputField from '@/components/ui/InputField'
import AuthCard from '@/components/ui/AuthCard'

export default function RegisterPage() {
    return (
        <AuthCard>
            
            {/* Avatar or Profile picture placeholder */}
            <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-border)',
                margin: '0 auto 40px',
            }} />

            {/* ROLE */}
            <p style={{
                color: 'var(--color-text-muted)',
                marginBottom: '8px',
            }}>Role</p>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '8px',
                marginBottom: '20px',
            }}>
                {['Elder', 'Caregiver', 'Seller'].map((role) => (
                    <label key={role} style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        color: 'var(--color-text)',
                        cursor: 'pointer',
                    }}>
                        <input
                            type="radio"
                            name="role"
                            value={role.toLowerCase()}
                        />
                        {role}
                    </label>
                ))}
            </div>

            {/* INPUT FIELDS */}
            <InputField label="First Name" id="firstName" name="firstName" />
            <InputField label="Last Name" id="lastName" name="lastName" />
            <InputField label="Phone Number" type="tel" id="phone" name="phone" />
            <InputField label="Email Address" type="email" id="email" name="email" />
            <InputField label="Password" type="password" id="password" name="password" />
            <InputField label="Confirm Password" type="password" id="confirmPassword" name="confirmPassword" />

            {/* REGISTER BUTTON */}
            <Button variant="primary" type="submit">Register</Button>

            {/* BACK LINK */}
            <a href="/login" style={{
                display: 'block',
                textAlign: 'center',
                color: 'var(--color-text-muted)',
                fontSize: '16px',
            }}>
                Back to Login
            </a>
        </AuthCard>
    )
}