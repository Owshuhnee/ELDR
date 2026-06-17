'use client'

// This page shows caregiver/elder links for the logged-in user
// It shows different content depending on whether you are an elder or caregiver

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import styles from './caregiver.module.css'

// This describes the shape of each link object returned from the API
interface Link {
  link_id:      number
  name:         string
  email:        string
  relationship: string
  helper_id?:   number
  elder_id?:    number
}

// This describes the logged-in user's basic info stored in localStorage
interface CurrentUser {
  id:         number
  role:       string
  first_name: string
}

export default function FamilyPage() {
  const router = useRouter()

  // links holds the list of connected caregivers or elders
  const [links, setLinks] = useState<Link[]>([])

  // currentUser holds the logged-in user's info
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null)

  // elderEmail is what the caregiver types into the link request form
  const [elderEmail, setElderEmail] = useState('')

  // message shows success or error feedback to the user
  const [message, setMessage] = useState('')

  // loading tracks whether we are still fetching data
  const [loading, setLoading] = useState(true)

  // useEffect runs once when the page loads
  // It reads the logged-in user from localStorage and fetches their links
  useEffect(() => {
    const stored = localStorage.getItem('user')
    if (!stored) {
      router.push('/login')
      return
    }

    const user = JSON.parse(stored)
    setCurrentUser(user)
    fetchLinks()
  }, [])

  // fetchLinks calls the backend and updates the links state
  const fetchLinks = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/caregiver/links', {
        credentials: 'include'
      })
      const data = await res.json()
      setLinks(data.links || [])
    } catch {
      setMessage('Could not load links')
    } finally {
      setLoading(false)
    }
  }

  // sendLinkRequest is called when a caregiver submits the form
  const sendLinkRequest = async () => {
    setMessage('')
    try {
      const res = await fetch('http://localhost:5000/api/caregiver/link', {
        method:      'POST',
        credentials: 'include',
        headers:     { 'Content-Type': 'application/json' },
        body:        JSON.stringify({
          target_email:  elderEmail,
          relationship: 'caregiver'
        })
      })
      const data = await res.json()
      if (res.ok) {
        setMessage('Link request sent successfully')
        setElderEmail('')
      } else {
        setMessage(data.error || 'Something went wrong')
      }
    } catch {
      setMessage('Could not send request')
    }
  }

  // removeLink calls the backend to delete the link by id
  // then refreshes the links list so the card disappears
  const removeLink = async (linkId: number) => {
    setMessage('')
    try {
      const res = await fetch('http://localhost:5000/api/caregiver/unlink', {
        method:      'DELETE',
        credentials: 'include',
        headers:     { 'Content-Type': 'application/json' },
        body:        JSON.stringify({ link_id: linkId })
      })
      const data = await res.json()
      if (res.ok) {
        setMessage('Link removed')
        fetchLinks()
      } else {
        setMessage(data.error || 'Could not remove link')
      }
    } catch {
      setMessage('Could not remove link')
    }
  }

  if (loading) return <p className={styles.loading}>Loading...</p>

   return (
    <div className={styles.page}>

      {/* Page header */}
      <div className={styles.header}>
        <button onClick={() => router.back()} className={styles.backButton}>
          ← Back
        </button>
        <h1 className={styles.title}>Family Access</h1>
      </div>

      {/* Show linked people */}
      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>
          {currentUser?.role === 'elder' ? 'Your Caregivers' : 'Your Elders'}
        </h2>

        {links.length === 0 ? (
          <p className={styles.empty}>No links yet</p>
        ) : (
          links.map(link => (
            <div key={link.link_id} className={styles.linkCard}>
              <p className={styles.linkName}>{link.name}</p>
              <p className={styles.linkEmail}>{link.email}</p>
              <p className={styles.linkRole}>{link.relationship}</p>

              {/* Remove button — calls the unlink endpoint with this link's id */}
              <button
                className={styles.removeButton}
                onClick={() => removeLink(link.link_id)}
              >
                Remove
              </button>
            </div>
          ))
        )}
      </section>

      {/* Both elders and caregivers can send a link request */}
    <section className={styles.section}>
      <h2 className={styles.sectionTitle}>
        {currentUser?.role === 'elder' ? 'Add a Caregiver' : 'Link to an Elder'}
      </h2>
      <input
        className={styles.input}
        type="email"
        placeholder={
          currentUser?.role === 'elder'
            ? "Enter caregiver's email"
            : "Enter elder's email"
        }
        value={elderEmail}
        onChange={e => setElderEmail(e.target.value)}
      />
      <button className={styles.button} onClick={sendLinkRequest}>
        Send Link Request
      </button>
      {message && <p className={styles.message}>{message}</p>}
    </section>

    </div>
  )
}