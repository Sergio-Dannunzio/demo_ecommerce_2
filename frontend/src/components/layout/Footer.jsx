import { Link } from 'react-router-dom'
import { brand, footer } from '../../brand.config'

export default function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-footer-bg)',
        color: 'var(--color-footer-text)',
        fontFamily: 'var(--font-body)',
      }}
      className=""
    >
      {/* Main grid */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '56px 20px 40px',
          display: 'grid',
          gap: '40px',
        }}
        className="grid-cols-1 md:grid-cols-4"
      >
        {/* Brand */}
        <div>
          <p
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: '1.5rem',
              color: '#f2ead8',
              marginBottom: '12px',
            }}
          >
            {brand.name}
          </p>
          <p style={{ fontSize: '13px', lineHeight: 1.7, maxWidth: '220px', opacity: 0.75 }}>
            {brand.tagline}
          </p>
          <div style={{ display: 'flex', gap: '14px', marginTop: '20px' }}>
            {footer.social.map(s => (
              <button
                key={s}
                aria-label={s}
                style={{
                  background: 'none',
                  border: '1px solid rgba(196,180,154,0.3)',
                  color: 'var(--color-footer-text)',
                  width: '34px',
                  height: '34px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  fontSize: '11px',
                  letterSpacing: '0.05em',
                  textTransform: 'uppercase',
                }}
              >
                {s.slice(0, 2).toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {footer.columns.map(col => (
          <div key={col.heading}>
            <p
              style={{
                fontSize: '10px',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#f2ead8',
                marginBottom: '16px',
              }}
            >
              {col.heading}
            </p>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '9px' }}>
              {col.links.map(l => (
                <li key={l}>
                  <Link
                    to="/"
                    style={{ fontSize: '13px', color: 'var(--color-footer-text)', textDecoration: 'none', opacity: 0.85 }}
                  >
                    {l}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '20px 20px',
          borderTop: '1px solid rgba(196,180,154,0.15)',
          display: 'flex',
          gap: '6px',
          fontSize: '11px',
          opacity: 0.55,
          letterSpacing: '0.06em',
          textAlign: 'center',
        }}
        className="flex-col items-center md:flex-row md:justify-between"
      >
        <span>© {brand.year} {brand.name}. Todos los derechos reservados.</span>
        <span>Diseñado con amor · Buenos Aires</span>
      </div>
    </footer>
  )
}
