import { Link } from 'react-router-dom'
import look1 from '../../assets/products/looks/look_1.jpg'
import look2 from '../../assets/products/looks/look_2.jpg'
import { useIsMobile } from '../../hooks/useIsMobile'

export default function EditorialFeature() {
  const isMobile = useIsMobile()

  return (
    <section
      style={{
        background: 'var(--color-bg)',
        padding: isMobile ? '56px 20px' : '100px 40px',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : '1fr 1fr',
          alignItems: 'center',
          gap: isMobile ? '40px' : '80px',
        }}
      >
        {/* ── Texto ── */}
        <div style={{ textAlign: 'center', padding: isMobile ? '0' : '0 32px', order: isMobile ? 2 : 0 }}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              color: 'var(--color-on-bg)',
              lineHeight: 1.15,
              marginBottom: '20px',
            }}
          >
            Prendas con historia
          </h2>

          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '15px',
              color: 'var(--color-muted)',
              lineHeight: 1.8,
              maxWidth: '360px',
              margin: '0 auto 32px',
            }}
          >
            Cada pieza pasa por nuestras manos antes de llegar a las tuyas.
            Seleccionadas por su calidad, historia y carácter único.
          </p>

          <Link
            to="/catalogo"
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 600,
              letterSpacing: '0.08em',
              color: 'var(--color-on-bg)',
              textDecoration: 'none',
              borderBottom: '1.5px solid var(--color-on-bg)',
              paddingBottom: '3px',
              transition: 'color 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'var(--color-accent)'
              e.currentTarget.style.borderColor = 'var(--color-accent)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'var(--color-on-bg)'
              e.currentTarget.style.borderColor = 'var(--color-on-bg)'
            }}
          >
            Explorar
          </Link>
        </div>

        {/* ── Imágenes ── */}
        <div style={{ position: 'relative', order: isMobile ? 1 : 0, paddingBottom: isMobile ? '0' : '36px' }}>
          {/* Imagen principal */}
          <div style={{ marginLeft: isMobile ? '0' : '10%', overflow: 'hidden' }}>
            <img
              src={look1}
              alt="Look principal"
              style={{
                width: '100%',
                height: isMobile ? '280px' : '520px',
                objectFit: 'cover',
                display: 'block',
              }}
            />
          </div>

          {/* Imagen pequeña — solo desktop */}
          {!isMobile && (
            <div
              style={{
                position: 'absolute',
                bottom: '-36px',
                left: 0,
                width: '42%',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(44,26,14,0.14)',
              }}
            >
              <img
                src={look2}
                alt="Look detalle"
                style={{
                  width: '100%',
                  height: '260px',
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
