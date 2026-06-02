// REGISTER PAGE

export default function RegisterPage() {
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

                {/* Avatar placeholder */}
                <div style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-border)',
                    margin: '0 auto 40px',
                }} />

                {/* Role */}
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

                {/* First Name */}
                <label htmlFor="firstName" style={{
                    color: 'var(--color-text-muted)',
                }}>First Name</label>
                <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    style={{
                        width: '100%',
                        border: '1px solid var(--color-border)',
                        borderRadius: '12px',
                        padding: '12px',
                        marginBottom: '16px',
                        marginTop: '4px',
                        display: 'block',
                    }}
                />

                {/* Last Name */}
                <label htmlFor="lastName" style={{
                    color: 'var(--color-text-muted)',
                }}>Last Name</label>
                <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    style={{
                        width: '100%',
                        border: '1px solid var(--color-border)',
                        borderRadius: '12px',
                        padding: '12px',
                        marginBottom: '16px',
                        marginTop: '4px',
                        display: 'block',
                    }}
                />

                {/* Phone Number */}
                <label htmlFor="phone" style={{
                    color: 'var(--color-text-muted)',
                }}>Phone Number</label>
                <input
                    type="tel"
                    id="phone"
                    name="phone"
                    style={{
                        width: '100%',
                        border: '1px solid var(--color-border)',
                        borderRadius: '12px',
                        padding: '12px',
                        marginBottom: '16px',
                        marginTop: '4px',
                        display: 'block',
                    }}
                />

                {/* Email */}
                <label htmlFor="email" style={{
                    color: 'var(--color-text-muted)',
                }}>Email Address</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    style={{
                        width: '100%',
                        border: '1px solid var(--color-border)',
                        borderRadius: '12px',
                        padding: '12px',
                        marginBottom: '16px',
                        marginTop: '4px',
                        display: 'block',
                    }}
                />

                {/* Password */}
                <label htmlFor="password" style={{
                    color: 'var(--color-text-muted)',
                }}>Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    style={{
                        width: '100%',
                        border: '1px solid var(--color-border)',
                        borderRadius: '12px',
                        padding: '12px',
                        marginBottom: '16px',
                        marginTop: '4px',
                        display: 'block',
                    }}
                />

                {/* Confirm Password */}
                <label htmlFor="confirmPassword" style={{
                    color: 'var(--color-text-muted)',
                }}>Confirm Password</label>
                <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    style={{
                        width: '100%',
                        border: '1px solid var(--color-border)',
                        borderRadius: '12px',
                        padding: '12px',
                        marginBottom: '24px',
                        marginTop: '4px',
                        display: 'block',
                    }}
                />

                {/* Register Button */}
                <button type="submit" style={{
                    width: '100%',
                    backgroundColor: 'var(--color-primary)',
                    color: 'white',
                    border: 'none',
                    borderRadius: '24px',
                    padding: '16px',
                    fontSize: '18px',
                    marginBottom: '12px',
                }}>
                    Register
                </button>

                {/* Back link */}
                <a href="/login" style={{
                    display: 'block',
                    textAlign: 'center',
                    color: 'var(--color-text-muted)',
                    fontSize: '16px',
                }}>
                    Back to Login
                </a>

            </div>
        </main>
    )
}