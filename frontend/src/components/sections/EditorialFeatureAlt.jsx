import { Link } from 'react-router-dom'
import img01 from '../../assets/products/section/arg-01.jpg'
import img02 from '../../assets/products/section/arg-02.jpg'
import { useIsMobile } from '../../hooks/useIsMobile'

export default function EditorialFeatureAlt() {
  const isMobile = useIsMobile()

  return (
    <section
      style={{
        background: 'var(--color-surface)',
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
        {/* ── Imágenes — izquierda (primera en DOM → primera en mobile) ── */}
        <div style={{ position: 'relative', paddingBottom: isMobile ? '0' : '36px' }}>
          <div style={{ marginRight: isMobile ? '0' : '10%', overflow: 'hidden' }}>
            <img
              src={img01}
              alt="Colección principal"
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
                bottom: 0,
                right: 0,
                width: '42%',
                overflow: 'hidden',
                boxShadow: '0 8px 32px rgba(44,26,14,0.14)',
              }}
            >
              <img
                src={img02}
                alt="Colección detalle"
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

        {/* ── Texto — derecha ── */}
        <div style={{ textAlign: 'center', padding: isMobile ? '0' : '0 32px' }}>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(2rem, 3.5vw, 3rem)',
              color: 'var(--color-on-bg)',
              lineHeight: 1.15,
              marginBottom: '20px',
            }}
          >
            Moda que vuelve a vivir
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
            Darle una segunda oportunidad a una prenda es el acto de moda
            más consciente que existe. Encontrá tu próxima favorita.
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
      </div>
    </section>
  )
}
