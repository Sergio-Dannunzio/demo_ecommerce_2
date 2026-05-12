import { Link } from 'react-router-dom'
import ProductCard from '../ui/ProductCard'
import { mockProducts } from '../../data/products'

export default function FeaturedProducts() {
  const featured = mockProducts.slice(0, 4)

  return (
    <section style={{ padding: '72px 20px', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          marginBottom: '40px',
          flexWrap: 'wrap',
          gap: '16px',
        }}
      >
        <div>
          <span
            style={{
              fontFamily: 'var(--font-accent)',
              fontSize: '14px',
              color: 'var(--color-accent)',
              display: 'block',
              marginBottom: '6px',
            }}
          >
            Selección de la semana
          </span>
          <h2
            style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.8rem, 3vw, 2.5rem)',
              color: 'var(--color-on-bg)',
              lineHeight: 1.1,
            }}
          >
            Piezas destacadas
          </h2>
        </div>
        <Link
          to="/catalogo"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-muted)',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            borderBottom: '1px solid var(--color-border)',
            paddingBottom: '2px',
          }}
        >
          Ver todo
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>arrow_forward</span>
        </Link>
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
        }}
        className="md:grid-cols-4"
      >
        {featured.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  )
}
