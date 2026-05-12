import { Link } from 'react-router-dom'
import { categories } from '../../brand.config'
import { useIsMobile } from '../../hooks/useIsMobile'
import look2  from '../../assets/products/looks/look_2.jpg'
import look3  from '../../assets/products/looks/look_3.jpg'
import look6  from '../../assets/products/looks/look_6.jpg'
import look4  from '../../assets/products/looks/look_4.jpg'

const PALETTE = [
  { bg: '#3d2812', text: '#f2ead8' },
  { bg: '#5a6b3a', text: '#f2ead8' },
  { bg: '#b8633a', text: '#fdf8f0' },
  { bg: '#8a7a68', text: '#fdf8f0' },
]

const IMAGES = [look2, look3, look6, look4]

export default function CategoryBanner() {
  const isMobile = useIsMobile()

  return (
    <section
      style={{
        background: 'var(--color-surface)',
        borderTop: '1px solid var(--color-border)',
        borderBottom: '1px solid var(--color-border)',
        padding: isMobile ? '56px 16px' : '72px 20px',
      }}
    >
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Title */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{ fontFamily: 'var(--font-accent)', fontSize: '14px', color: 'var(--color-accent)', display: 'block', marginBottom: '8px' }}>
            Explorá por categoría
          </span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: 'var(--color-on-bg)' }}>
            ¿Qué estás buscando?
          </h2>
        </div>

        {/* Grid */}
        <div
          style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' }}
          className="md:grid-cols-4"
        >
          {categories.map((cat, i) => {
            const palette = PALETTE[i % PALETTE.length]
            const img     = IMAGES[i % IMAGES.length]
            return (
              <Link
                key={cat.slug}
                to={`/catalogo/${cat.slug}`}
                style={{
                  background:     palette.bg,
                  color:          palette.text,
                  textDecoration: 'none',
                  display:        'flex',
                  flexDirection:  'row',
                  alignItems:     'stretch',
                  height:         isMobile ? '160px' : '200px',
                  position:       'relative',
                  overflow:       'hidden',
                  transition:     'transform 0.2s ease, box-shadow 0.2s ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform  = 'translateY(-3px)'
                  e.currentTarget.style.boxShadow  = '0 12px 32px rgba(44,26,14,0.22)'
                  e.currentTarget.querySelector('img').style.transform = 'scale(1.06)'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform  = 'translateY(0)'
                  e.currentTarget.style.boxShadow  = 'none'
                  e.currentTarget.querySelector('img').style.transform = 'scale(1)'
                }}
              >
                {/* Texto — izquierda */}
                <div style={{ flex: 1, padding: isMobile ? '16px 12px' : '28px 20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', zIndex: 1 }}>
                  {/* Corner decoration */}
                  <span style={{ position: 'absolute', top: 10, left: 10, width: 14, height: 14, borderTop: `1.5px solid ${palette.text}`, borderLeft: `1.5px solid ${palette.text}`, opacity: 0.35 }} />

                  <p style={{ fontFamily: 'var(--font-accent)', fontSize: '11px', opacity: 0.6, letterSpacing: '0.04em' }}>
                    {cat.count}
                  </p>

                  <div>
                    <p style={{ fontFamily: 'var(--font-heading)', fontSize: isMobile ? '1.1rem' : '1.4rem', lineHeight: 1.1, marginBottom: '10px' }}>
                      {cat.label}
                    </p>
                    <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '10px', fontFamily: 'var(--font-body)', letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.7 }}>
                      Ver todo
                      <span className="material-symbols-outlined" style={{ fontSize: '13px' }}>arrow_forward</span>
                    </span>
                  </div>
                </div>

                {/* Imagen — derecha */}
                <div style={{ width: '45%', flexShrink: 0, position: 'relative', overflow: 'hidden' }}>
                  <img
                    src={img}
                    alt={cat.label}
                    style={{
                      width:      '100%',
                      height:     '100%',
                      objectFit:  'cover',
                      display:    'block',
                      transition: 'transform 0.5s cubic-bezier(0.25,0,0.25,1)',
                    }}
                  />
                  {/* Overlay de transición color → imagen */}
                  <div style={{ position: 'absolute', inset: 0, background: `linear-gradient(to right, ${palette.bg} 0%, transparent 40%)`, pointerEvents: 'none' }} />
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
