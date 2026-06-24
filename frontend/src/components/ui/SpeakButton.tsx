'use client'

import { useState, useEffect } from 'react'

type SpeakButtonProps = {
    text: string
    label: string // for the aria-label, e.g. "product description"
}

export default function SpeakButton({ text, label }: SpeakButtonProps) {
    const [isSpeaking, setIsSpeaking] = useState(false)

    const handleClick = () => {
        // Already speaking -> stop and reset.
        if (isSpeaking) {
            window.speechSynthesis.cancel()
            setIsSpeaking(false)
            return
        }

        // Not speaking -> clear the shared channel first, then start fresh.
        window.speechSynthesis.cancel()

        const utterance = new SpeechSynthesisUtterance(text)
        utterance.onend = () => setIsSpeaking(false)

        setIsSpeaking(true)
        window.speechSynthesis.speak(utterance)
    }

    // Safety net: if the user navigates away while it's still talking,
    // stop the audio so it doesn't keep reading on the next page.
    useEffect(() => {
        return () => {
            window.speechSynthesis.cancel()
        }
    }, [])

    return (
        <button
            onClick={handleClick}
            className="speak-btn"
            aria-label={isSpeaking ? `Stop reading ${label}` : `Read ${label} aloud`}
        >

            {isSpeaking ? '⏹' : '🔊'}
        </button>
    )
}
