import { trustBar } from '../../brand.config'

export default function TrustBar() {
  return (
    <div
      style={{
        background: 'var(--color-surface)',
        borderBottom: '1px solid var(--color-border)',
        padding: '24px 20px',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '16px',
        }}
        className="md:grid-cols-4"
      >
        {trustBar.map(item => (
          <div
            key={item.label}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: '12px',
            }}
          >
            <span
              className="material-symbols-outlined"
              style={{ fontSize: '22px', color: 'var(--color-accent)', flexShrink: 0, marginTop: '1px' }}
            >
              {item.icon}
            </span>
            <div>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 600,
                  color: 'var(--color-on-bg)',
                  letterSpacing: '0.02em',
                }}
              >
                {item.label}
              </p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--color-muted)' }}>
                {item.sub}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
