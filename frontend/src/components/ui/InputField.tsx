type Props = {
    label: string;
    type?: 'text' | 'email' | 'password' | 'tel';
    id: string;
    name: string;
    onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function InputField({ label, type = 'text', id, name, onChange }: Props) {
    return (
        <div style={{
            marginBottom: '16px',
        }}>
            <label htmlFor={id} style={{
                color: 'var(--color-text-muted)',
                display: 'block',
                marginBottom: '4px',
            }}>
                {label}
            </label>
            <input
                type={type}
                id={id}
                name={name}
                onChange={onChange}
                style={{
                    width: '100%',
                    border: '1px solid var(--color-border)',
                    borderRadius: '12px',
                    padding: '12px',
                    fontSize: '18px',
                    backgroundColor: 'var(--color-surface)',
                    color: 'var(--color-text)',
                    display: 'block',
                }}
            />
        </div>
    )
}