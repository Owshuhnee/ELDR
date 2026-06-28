'use client'

import { useState } from 'react'
import Button from '@/components/ui/Button'
import InputField from '@/components/ui/InputField'
import AuthCard from '@/components/ui/AuthCard'
import styles from './login.module.css'

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
                credentials: 'include',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            const data = await response.json()

            if (response.ok) {
                // Save the full user object so any page can read role, name, email
                localStorage.setItem('user', JSON.stringify(data.user))
                window.location.href = '/'
            } else {
                setError(data.error || 'Login failed')
            }

        } catch (err) {
            setError('Could not connect to server. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthCard>
            <img
                src="/logo.png"
                alt="ELDR Logo"
                className={styles.logo}
            />

            {error && (
                <p className={styles.error}>{error}</p>
            )}

            <form onSubmit={handleSubmit} className={styles.form}>
                <InputField label="Email" type="email" id="email" name="email" onChange={handleChange} />
                <InputField label="Password" type="password" id="password" name="password" onChange={handleChange} />

                <Button variant="primary" type="submit">
                    {loading ? 'Logging in...' : 'Login'}
                </Button>
            </form>

            <div className={styles.links}>
                <a href="/forgot-password">Forgot password?</a>
                <a href="/register">Create Account</a>
            </div>
        </AuthCard>
    )
}