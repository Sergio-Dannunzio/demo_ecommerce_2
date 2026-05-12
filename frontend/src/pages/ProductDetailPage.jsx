import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { mockProducts } from '../data/products'
import ProductCard from '../components/ui/ProductCard'
import { useIsMobile } from '../hooks/useIsMobile'

export default function ProductDetailPage() {
  const isMobile = useIsMobile()
  const { slug } = useParams()
  const product = mockProducts.find(p => p.slug === slug)
  const [selectedSize, setSelectedSize] = useState(null)
  const [activeImg,    setActiveImg]    = useState(0)

  if (!product) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', color: 'var(--color-muted)' }}>
        <span className="material-symbols-outlined" style={{ fontSize: '48px', opacity: 0.35 }}>search_off</span>
        <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem' }}>Producto no encontrado</p>
        <Link to="/catalogo" className="btn-outline">Ver catálogo</Link>
      </div>
    )
  }

  const sizes   = product.sizes.length > 0 ? product.sizes : [product.size].filter(Boolean)
  const related = mockProducts.filter(p => p.category === product.category && p.id !== product.id).slice(0, 4)

  const images = [product.image, product.image, product.image].filter(Boolean)

  const hPad = isMobile ? '12px 16px' : '12px 40px'

  return (
    <div style={{ background: 'var(--color-bg)' }}>

      {/* Breadcrumb */}
      <div style={{ borderBottom: '1px solid var(--color-border)', padding: hPad }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', gap: '8px', fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-muted)', flexWrap: 'wrap' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <Link to="/catalogo" style={{ color: 'inherit', textDecoration: 'none' }}>Catálogo</Link>
          <span>›</span>
          <span style={{ color: 'var(--color-on-bg)' }}>{product.name}</span>
        </div>
      </div>

      {/* Main layout */}
      {isMobile ? (
        /* ── MOBILE: columna única ── */
        <div style={{ maxWidth: '1280px', margin: '0 auto', paddingBottom: '80px' }}>
          {/* Imagen principal */}
          <div style={{ background: 'var(--color-surface)', overflow: 'hidden' }}>
            {images[activeImg] ? (
              <img
                src={images[activeImg]}
                alt={product.name}
                style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }}
              />
            ) : (
              <div style={{ width: '100%', aspectRatio: '3/4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '64px', opacity: 0.2 }}>image</span>
              </div>
            )}
          </div>

          {/* Thumbnails — scroll horizontal en mobile */}
          {images.length > 1 && (
            <div style={{ display: 'flex', gap: '8px', padding: '12px 16px', overflowX: 'auto' }} className="scrollbar-hide">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  style={{
                    padding: 0,
                    border: activeImg === i ? '2px solid var(--color-primary)' : '2px solid transparent',
                    cursor: 'pointer',
                    background: 'var(--color-surface)',
                    overflow: 'hidden',
                    flexShrink: 0,
                    transition: 'border-color 0.15s',
                  }}
                >
                  <img src={img} alt={`Vista ${i + 1}`} style={{ width: '64px', height: '80px', objectFit: 'cover', display: 'block' }} />
                </button>
              ))}
            </div>
          )}

          {/* Info */}
          <div style={{ padding: '20px 16px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {product.isNew && (
              <span style={{ display: 'inline-block', border: '1px solid var(--color-on-bg)', fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', padding: '3px 8px', color: 'var(--color-on-bg)', alignSelf: 'flex-start' }}>
                NUEVO
              </span>
            )}

            <div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 6vw, 2rem)', color: 'var(--color-on-bg)', lineHeight: 1.1, marginBottom: '8px' }}>
                {product.name}
              </h1>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-muted)' }}>
                {product.brand || 'Sin marca'}
              </p>
            </div>

            <div>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--color-on-bg)' }}>
                ${product.price.toLocaleString('es-AR')}
                {product.originalPrice && (
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--color-muted)', textDecoration: 'line-through', marginLeft: '12px' }}>
                    ${product.originalPrice.toLocaleString('es-AR')}
                  </span>
                )}
              </p>
            </div>

            <div style={{ height: '1px', background: 'var(--color-border)' }} />

            {sizes.length > 0 && (
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--color-on-bg)', marginBottom: '12px' }}>Talle</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      style={{
                        minWidth: '44px', height: '44px', padding: '0 10px',
                        border: selectedSize === s ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                        background: selectedSize === s ? 'var(--color-primary)' : 'transparent',
                        color: selectedSize === s ? 'var(--color-on-primary)' : 'var(--color-on-bg)',
                        fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600,
                        cursor: 'pointer', transition: 'all 0.15s',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--color-on-bg)', marginBottom: '4px' }}>Disponibilidad</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-accent)', fontWeight: 500 }}>¡Solo 1 disponible. Pieza única!</p>
              <div style={{ width: '48px', height: '2px', background: 'var(--color-accent)', marginTop: '8px' }} />
            </div>

            <div style={{ height: '1px', background: 'var(--color-border)' }} />

            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--color-on-bg)', textDecoration: 'underline', alignSelf: 'flex-start' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>straighten</span>
              Guía de talles
            </button>

            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '18px', fontSize: '13px', letterSpacing: '0.12em' }}
              onClick={() => !selectedSize && sizes.length > 0 && alert('Seleccioná un talle')}
            >
              AGREGAR A LA BOLSA
            </button>

            {product.description && (
              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '20px' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '10px' }}>
                  Descripción
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-on-bg)', lineHeight: 1.75 }}>
                  {product.description}
                </p>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* ── DESKTOP: 3 columnas ── */
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '40px 40px 80px', display: 'grid', gridTemplateColumns: '80px 1fr 420px', gap: '20px', alignItems: 'start' }}>

          {/* Thumbnails — columna izquierda */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', position: 'sticky', top: '108px' }}>
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setActiveImg(i)}
                style={{
                  padding: 0,
                  border: activeImg === i ? '2px solid var(--color-primary)' : '2px solid transparent',
                  cursor: 'pointer',
                  background: 'var(--color-surface)',
                  overflow: 'hidden',
                  transition: 'border-color 0.15s',
                }}
              >
                <img src={img} alt={`Vista ${i + 1}`} style={{ width: '72px', height: '90px', objectFit: 'cover', display: 'block' }} />
              </button>
            ))}
          </div>

          {/* Imagen principal */}
          <div style={{ position: 'sticky', top: '108px', background: 'var(--color-surface)', overflow: 'hidden' }}>
            {images[activeImg] ? (
              <img src={images[activeImg]} alt={product.name} style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }} />
            ) : (
              <div style={{ width: '100%', aspectRatio: '3/4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '64px', opacity: 0.2 }}>image</span>
              </div>
            )}
          </div>

          {/* Info — columna derecha */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>

            {product.isNew && (
              <span style={{ display: 'inline-block', border: '1px solid var(--color-on-bg)', fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', padding: '3px 8px', color: 'var(--color-on-bg)', alignSelf: 'flex-start' }}>
                NUEVO
              </span>
            )}

            <div>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)', color: 'var(--color-on-bg)', lineHeight: 1.1, marginBottom: '8px' }}>
                {product.name}
              </h1>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-muted)' }}>
                {product.brand || 'Sin marca'}
              </p>
            </div>

            <div>
              <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.6rem', color: 'var(--color-on-bg)' }}>
                ${product.price.toLocaleString('es-AR')}
                {product.originalPrice && (
                  <span style={{ fontFamily: 'var(--font-body)', fontSize: '1rem', color: 'var(--color-muted)', textDecoration: 'line-through', marginLeft: '12px' }}>
                    ${product.originalPrice.toLocaleString('es-AR')}
                  </span>
                )}
              </p>
            </div>

            <div style={{ height: '1px', background: 'var(--color-border)' }} />

            {sizes.length > 0 && (
              <div>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--color-on-bg)', marginBottom: '12px' }}>Talle</p>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {sizes.map(s => (
                    <button
                      key={s}
                      onClick={() => setSelectedSize(s)}
                      style={{
                        minWidth: '44px', height: '44px', padding: '0 10px',
                        border: selectedSize === s ? '2px solid var(--color-primary)' : '1px solid var(--color-border)',
                        background: selectedSize === s ? 'var(--color-primary)' : 'transparent',
                        color: selectedSize === s ? 'var(--color-on-primary)' : 'var(--color-on-bg)',
                        fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600,
                        cursor: 'pointer', transition: 'all 0.15s',
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--color-on-bg)', marginBottom: '4px' }}>Disponibilidad</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-accent)', fontWeight: 500 }}>¡Solo 1 disponible. Pieza única!</p>
              <div style={{ width: '48px', height: '2px', background: 'var(--color-accent)', marginTop: '8px' }} />
            </div>

            <div style={{ height: '1px', background: 'var(--color-border)' }} />

            <button style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', padding: 0, fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--color-on-bg)', textDecoration: 'underline', alignSelf: 'flex-start' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>straighten</span>
              Guía de talles
            </button>

            <button
              className="btn-primary"
              style={{ width: '100%', justifyContent: 'center', padding: '18px', fontSize: '13px', letterSpacing: '0.12em' }}
              onClick={() => !selectedSize && sizes.length > 0 && alert('Seleccioná un talle')}
            >
              AGREGAR A LA BOLSA
            </button>

            {product.description && (
              <div style={{ borderTop: '1px solid var(--color-border)', paddingTop: '20px' }}>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-muted)', marginBottom: '10px' }}>
                  Descripción
                </p>
                <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-on-bg)', lineHeight: 1.75 }}>
                  {product.description}
                </p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Productos relacionados */}
      {related.length > 0 && (
        <div style={{ borderTop: '1px solid var(--color-border)', background: 'var(--color-surface)', padding: isMobile ? '40px 16px' : '56px 40px' }}>
          <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', marginBottom: '32px', color: 'var(--color-on-bg)' }}>
              También te puede interesar
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(4, 1fr)', gap: isMobile ? '16px 12px' : '20px' }}>
              {related.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
