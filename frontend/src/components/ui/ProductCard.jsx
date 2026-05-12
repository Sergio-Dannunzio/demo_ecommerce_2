import { Link } from 'react-router-dom'
import { useState } from 'react'

export default function ProductCard({ product }) {
  const [hovered, setHovered] = useState(false)

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ display: 'flex', flexDirection: 'column', gap: 0 }}
    >
      {/* Image area */}
      <Link
        to={`/producto/${product.slug}`}
        style={{
          display: 'block',
          position: 'relative',
          aspectRatio: '3/4',
          overflow: 'hidden',
          background: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          textDecoration: 'none',
        }}
      >
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.45s ease',
              transform: hovered ? 'scale(1.04)' : 'scale(1)',
            }}
          />
        ) : (
          /* Placeholder cuando no hay imagen */
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              color: 'var(--color-muted)',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '36px', opacity: 0.35 }}>
              image
            </span>
          </div>
        )}

        {/* Tags */}
        <div
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            display: 'flex',
            flexDirection: 'column',
            gap: '5px',
          }}
        >
          {product.isNew && (
            <span
              style={{
                background: 'var(--color-primary)',
                color: 'var(--color-on-primary)',
                fontFamily: 'var(--font-body)',
                fontSize: '9px',
                fontWeight: 600,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                padding: '3px 8px',
              }}
            >
              Nuevo
            </span>
          )}
        </div>

        {/* Quick add on hover */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            background: 'var(--color-primary)',
            color: 'var(--color-on-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            padding: '11px',
            fontFamily: 'var(--font-body)',
            fontSize: '11px',
            fontWeight: 600,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            transform: hovered ? 'translateY(0)' : 'translateY(100%)',
            transition: 'transform 0.25s ease',
            cursor: 'pointer',
          }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>shopping_bag</span>
          Agregar
        </div>
      </Link>

      {/* Info */}
      <div style={{ padding: '12px 2px 0' }}>
        <Link
          to={`/producto/${product.slug}`}
          style={{ textDecoration: 'none', color: 'inherit' }}
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '13px',
              fontWeight: 500,
              color: 'var(--color-on-bg)',
              marginBottom: '4px',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {product.name}
          </p>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
          <span className="price-tag">${product.price.toLocaleString('es-AR')}</span>
          {product.originalPrice && (
            <span className="price-tag-old">${product.originalPrice.toLocaleString('es-AR')}</span>
          )}
        </div>

        {product.size && (
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '11px',
              color: 'var(--color-muted)',
              marginTop: '4px',
              letterSpacing: '0.04em',
            }}
          >
            Talle {product.size}
          </p>
        )}
      </div>
    </article>
  )
}
