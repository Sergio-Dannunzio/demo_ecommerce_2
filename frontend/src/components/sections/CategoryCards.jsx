import { Link } from 'react-router-dom'
import look3 from '../../assets/products/looks/look_3.jpg'
import look6 from '../../assets/products/looks/look_6.jpg'
import look9 from '../../assets/products/looks/look_9.jpg'
import { useIsMobile } from '../../hooks/useIsMobile'

const CARDS = [
  {
    image:       look3,
    title:       'Outerwear vintage',
    description: 'Camperas y abrigos con historia. Piezas únicas para el frío.',
    slug:        'mujer',
  },
  {
    image:       look6,
    title:       'Denim de época',
    description: 'Jeans y chaquetas de mezclilla con el desgaste justo.',
    slug:        'hombre',
  },
  {
    image:       look9,
    title:       'Esenciales de feria',
    description: 'Básicos atemporales que nunca pasan de moda.',
    slug:        'accesorios',
  },
]

export default function CategoryCards() {
  const isMobile = useIsMobile()

  return (
    <section style={{ background: 'var(--color-bg)', padding: isMobile ? '60px 20px' : '80px 40px' }}>
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          display: 'grid',
          gap: '16px',
        }}
        className="grid-cols-1 md:grid-cols-3"
      >
        {CARDS.map(card => (
          <div
            key={card.slug}
            style={{
              position: 'relative',
              overflow: 'hidden',
              height: isMobile ? '320px' : '480px',
              cursor: 'pointer',
            }}
          >
            {/* Imagen */}
            <img
              src={card.image}
              alt={card.title}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                transition: 'transform 0.6s cubic-bezier(0.25, 0, 0.25, 1)',
              }}
              onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
            />

            {/* Gradiente oscuro */}
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0,0,0,0.72) 0%, rgba(0,0,0,0.15) 55%, transparent 100%)',
                pointerEvents: 'none',
              }}
            />

            {/* Texto */}
            <div
              style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '32px 28px',
                textAlign: 'center',
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontSize: '1.75rem',
                  color: '#ffffff',
                  marginBottom: '8px',
                  lineHeight: 1.1,
                }}
              >
                {card.title}
              </h3>

              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '13px',
                  color: 'rgba(255,255,255,0.75)',
                  lineHeight: 1.6,
                  marginBottom: '16px',
                }}
              >
                {card.description}
              </p>

              <Link
                to={`/catalogo/${card.slug}`}
                style={{
                  fontFamily: 'var(--font-body)',
                  fontSize: '12px',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
                  color: '#ffffff',
                  textDecoration: 'none',
                  borderBottom: '1.5px solid rgba(255,255,255,0.7)',
                  paddingBottom: '2px',
                  transition: 'border-color 0.15s',
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = '#ffffff'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.7)'}
              >
                Explorar
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
