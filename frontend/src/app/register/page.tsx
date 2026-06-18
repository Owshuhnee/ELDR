'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Button from '@/components/ui/Button'
import InputField from '@/components/ui/InputField'
import AuthCard from '@/components/ui/AuthCard'
import styles from './register.module.css'
import shared from '@/components/ui/shared.module.css'

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

        // Basic validation
        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match')
            setLoading(false)
            return
        }

        try {
            // Elders go through onboarding first
            // Store their data temporarily and redirect
            if (formData.role === 'elder') {
                localStorage.setItem('pending_registration', JSON.stringify(formData))
                router.push('/onboarding')
                return
            }

            // Caregivers and sellers skip onboarding
            // Register them directly and go to home
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method:      'POST',
                credentials: 'include',
                headers:     { 'Content-Type': 'application/json' },
                body:        JSON.stringify(formData)
            })

            const data = await response.json()

            if (response.ok) {
                localStorage.setItem('user', JSON.stringify(data.user))
                router.push('/')
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
            {/* Avatar placeholder */}
            <div className={styles.avatar} />

            {/* Success message */}
            {message && <p className={shared.success}>{message}</p>}

            {/* Error message */}
            {error && <p className={shared.error}>{error}</p>}

            <form onSubmit={handleSubmit} className={shared.form}>

                {/* Role selection */}
                <p className={styles.roleLabel}>Role</p>
                <div className={styles.roleGroup}>
                    {['Elder', 'Caregiver', 'Seller'].map((role) => (
                        <label key={role} className={styles.roleOption}>
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

                <InputField label="First Name" id="firstName" name="firstName" onChange={handleChange} />
                <InputField label="Last Name" id="lastName" name="lastName" onChange={handleChange} />
                <InputField label="Phone Number" type="tel" id="phone" name="phone" onChange={handleChange} />
                <InputField label="Email Address" type="email" id="email" name="email" onChange={handleChange} />
                <InputField label="Password" type="password" id="password" name="password" onChange={handleChange} />
                <InputField label="Confirm Password" type="password" id="confirmPassword" name="confirmPassword" onChange={handleChange} />

                <Button variant="primary" type="submit">
                    {loading ? 'Registering...' : 'Register'}
                </Button>

            </form>

            <a href="/login" className={styles.backLink}>
                Back to Login
            </a>
        </AuthCard>
    )
}