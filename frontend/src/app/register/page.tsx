'use client'

// REGISTER PAGE
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import InputField from '@/components/ui/InputField'
import AuthCard from '@/components/ui/AuthCard'


export default function RegisterPage() {

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        role: 'elder'
    })

    const [message, setMessage] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setMessage('')
        setError('')

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data.user))
                router.push('/onboarding')
            } else {
                setError(data.error)
            }

        } catch (err) {
            setError('Could not connect to server. Please try again.')
        } finally {
            setLoading(false)
        }
    }

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

            {/* Success message */}
            {message && (
                <p style={{
                    backgroundColor: '#d4edda',
                    color: '#155724',
                    padding: '12px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    textAlign: 'center',
                }}>
                    {message}
                </p>
            )}

            {/* Error message */}
            {error && (
                <p style={{
                    backgroundColor: '#f8d7da',
                    color: '#721c24',
                    padding: '12px',
                    borderRadius: '8px',
                    marginBottom: '16px',
                    textAlign: 'center',
                }}>
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit}>

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
                                checked={formData.role === role.toLowerCase()}
                                onChange={handleChange}
                            />
                            {role}
                        </label>
                    ))}
                </div>

                {/* INPUT FIELDS */}
                <InputField label="First Name" id="firstName" name="firstName" onChange={handleChange} />
                <InputField label="Last Name" id="lastName" name="lastName" onChange={handleChange} />
                <InputField label="Phone Number" type="tel" id="phone" name="phone" onChange={handleChange} />
                <InputField label="Email Address" type="email" id="email" name="email" onChange={handleChange} />
                <InputField label="Password" type="password" id="password" name="password" onChange={handleChange} />
                <InputField label="Confirm Password" type="password" id="confirmPassword" name="confirmPassword" onChange={handleChange} />

                {/* REGISTER BUTTON */}
                <Button variant="primary" type="submit">
                    {loading ? 'Registering...' : 'Register'}
                </Button>

            </form>

            {/* Back link */}
            <a href="/login" style={{
                display: 'block',
                textAlign: 'center',
                color: 'var(--color-text-muted)',
                fontSize: '16px',
                marginTop: '16px',
            }}>
                Back to Login
            </a>
        </AuthCard>
    )
}