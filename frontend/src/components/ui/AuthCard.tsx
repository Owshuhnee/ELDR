import styles from './AuthCard.module.css'

type Props = {
    children: React.ReactNode
}

export default function AuthCard({ children }: Props) {
    return (
        <main className={styles.wrapper}>
            <div className={styles.card}>
                {children}
            </div>
        </main>
    )
}