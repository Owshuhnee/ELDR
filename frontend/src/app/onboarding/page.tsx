'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

const questions = [
  {
    id: 'needs_mobility',
    text: 'Do you have difficulty walking or need mobility assistance products?',
  },
  {
    id: 'needs_vision',
    text: 'Do you have any vision difficulties that affect how you use digital screens?',
  },
]

export default function OnboardingPage() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, boolean>>({})
  const [loading, setLoading] = useState(false)

  const currentQuestion = questions[step]
  const isLastQuestion = step === questions.length - 1

  const handleAnswer = async (answer: boolean) => {
    const updatedAnswers = { ...answers, [currentQuestion.id]: answer }
    setAnswers(updatedAnswers)

    if (!isLastQuestion) {
      setStep(step + 1)
      return
    }

    setLoading(true)
    const user = JSON.parse(localStorage.getItem('user') || '{}')

    try {
      const res = await fetch('http://localhost:5000/api/onboarding/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.id,
          ...updatedAnswers,
        }),
      })

      if (res.ok) {
        router.push('/')
      }
    } catch (err) {
      console.error('Onboarding error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main style={{
      minHeight: '100vh',
      backgroundColor: 'var(--background)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem',
    }}>
      <div style={{
        backgroundColor: 'var(--surface)',
        borderRadius: '1rem',
        padding: '3rem',
        maxWidth: '600px',
        width: '100%',
        textAlign: 'center',
      }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontSize: '1rem' }}>
          Question {step + 1} of {questions.length}
        </p>

        <h1 style={{
          fontSize: '1.75rem',
          fontWeight: 'bold',
          color: 'var(--text)',
          marginBottom: '2.5rem',
          lineHeight: '1.4',
        }}>
          {currentQuestion.text}
        </h1>

        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
          <button
            onClick={() => handleAnswer(true)}
            disabled={loading}
            style={{
              backgroundColor: 'var(--primary)',
              color: 'white',
              border: 'none',
              borderRadius: '0.5rem',
              padding: '1rem 3rem',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              minWidth: '140px',
            }}
          >
            Yes
          </button>
          <button
            onClick={() => handleAnswer(false)}
            disabled={loading}
            style={{
              backgroundColor: 'var(--surface)',
              color: 'var(--text)',
              border: '2px solid var(--border)',
              borderRadius: '0.5rem',
              padding: '1rem 3rem',
              fontSize: '1.25rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              minWidth: '140px',
            }}
          >
            No
          </button>
        </div>

        {loading && (
          <p style={{ marginTop: '1.5rem', color: 'var(--text-muted)' }}>
            Saving your preferences...
          </p>
        )}
      </div>
    </main>
  )
}