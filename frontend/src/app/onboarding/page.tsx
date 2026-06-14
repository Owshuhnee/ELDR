'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import styles from './onboarding.module.css'
import Button from '@/components/ui/Button'

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
    <main className={styles.wrapper}>
      <div className={styles.card}>

        {/* Progress indicator */}
        <p className={styles.progress}>
          Question {step + 1} of {questions.length}
        </p>

        {/* Question text */}
        <h1 className={styles.question}>
          {currentQuestion.text}
        </h1>

        {/* Yes / No buttons stacked vertically */}
        <div className={styles.actions}>
          <Button variant="primary" onClick={() => handleAnswer(true)} disabled={loading}>
            Yes
          </Button>
          <Button variant="secondary" onClick={() => handleAnswer(false)} disabled={loading}>
            No
          </Button>
        </div>

        {/* Shows while saving to backend */}
        {loading && (
          <p className={styles.saving}>Saving your preferences...</p>
        )}

      </div>
    </main>
  )
}