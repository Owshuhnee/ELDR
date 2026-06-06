'use client'

// LOGIN PAGE
import { useState } from 'react'
import Button from '@/components/ui/Button'
import InputField from '@/components/ui/InputField'
import AuthCard from '@/components/ui/AuthCard'

export default function LoginPage() {

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })

    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setLoading(true)
        setError('')

        try {
            const response = await fetch('http://localhost:5000/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (response.ok) {
                window.location.href = '/dashboard'
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
            {/* ELDER LOGO placeholder */}
            <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-border)',
                margin: '0 auto 40px',
            }} />

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
                <InputField label="Email" type="email" id="email" name="email" onChange={handleChange} />
                <InputField label="Password" type="password" id="password" name="password" onChange={handleChange} />

                <Button variant="primary" type="submit">
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
                <div style={{ marginTop: '12px' }}>
                    <Button variant="secondary">Login as Guest</Button>
                </div>

            </form>

            {/* Bottom links */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                marginTop: '24px',
            }}>
                <a href="/forgot-password">Forgot password?</a>
                <a href="/register">Create Account</a>
            </div>
        </AuthCard>
    )
}