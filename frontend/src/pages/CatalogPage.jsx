import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { mockProducts } from '../data/products'
import { nav } from '../brand.config'
import { useIsMobile } from '../hooks/useIsMobile'

const SORT_OPTIONS = [
  { value: 'newest',     label: 'Más nuevos' },
  { value: 'price-asc',  label: 'Menor precio' },
  { value: 'price-desc', label: 'Mayor precio' },
]


function FilterSection({ title, children, defaultOpen = true }) {
  const [open, setOpen] = useState(defaultOpen)
  return (
    <div style={{ borderBottom: '1px solid var(--color-border)', paddingBottom: '20px', marginBottom: '20px' }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', background: 'none', border: 'none', cursor: 'pointer', padding: 0, marginBottom: open ? '14px' : 0 }}
      >
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--color-on-bg)', letterSpacing: '0.04em' }}>
          {title}
        </span>
        <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--color-muted)', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}>
          expand_more
        </span>
      </button>
      {open && children}
    </div>
  )
}

function CheckboxItem({ label, count, checked, onChange }) {
  return (
    <label style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginBottom: '10px' }}>
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        style={{ width: '14px', height: '14px', accentColor: 'var(--color-primary)', cursor: 'pointer', flexShrink: 0 }}
      />
      <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-on-bg)' }}>
        {label}
        {count !== undefined && (
          <span style={{ color: 'var(--color-muted)', marginLeft: '5px' }}>({count})</span>
        )}
      </span>
    </label>
  )
}

function CatalogCard({ product }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Link
      to={`/producto/${product.slug}`}
      style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div style={{ position: 'relative', overflow: 'hidden', background: 'var(--color-surface)', marginBottom: '14px', aspectRatio: '3/4' }}>
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s cubic-bezier(0.25,0,0.25,1)', transform: hovered ? 'scale(1.04)' : 'scale(1)' }}
          />
        ) : (
          <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '40px', opacity: 0.2 }}>image</span>
          </div>
        )}
        {product.isNew && (
          <span style={{ position: 'absolute', top: '10px', left: '10px', background: 'var(--color-primary)', color: 'var(--color-on-primary)', fontFamily: 'var(--font-body)', fontSize: '9px', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', padding: '3px 8px' }}>
            Nuevo
          </span>
        )}
      </div>

      {/* Info */}
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-on-bg)', marginBottom: '6px', lineHeight: 1.3 }}>
        {product.name}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-on-bg)' }}>
          ${product.price.toLocaleString('es-AR')}
        </span>
        {product.originalPrice && (
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-muted)', textDecoration: 'line-through' }}>
            ${product.originalPrice.toLocaleString('es-AR')}
          </span>
        )}
      </div>
      {product.sizes.length > 0 && (
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-muted)', marginTop: '4px' }}>
          {product.sizes.length} {product.sizes.length === 1 ? 'talle' : 'talles'}
        </p>
      )}
    </Link>
  )
}

export default function CatalogPage() {
  const isMobile = useIsMobile()
  const { categoria } = useParams()
  const [sort,        setSort]        = useState('newest')
  const [sidebarOpen, setSidebarOpen] = useState(!isMobile)
  const [filterNew,   setFilterNew]   = useState(false)

  const currentCat = nav.find(n => n.slug === categoria)

  // Filtros
  let filtered = categoria
    ? mockProducts.filter(p => p.category === categoria)
    : mockProducts

  if (filterNew) filtered = filtered.filter(p => p.isNew)

  // Orden
  const sorted = [...filtered].sort((a, b) => {
    if (sort === 'price-asc')  return a.price - b.price
    if (sort === 'price-desc') return b.price - a.price
    return b.id - a.id
  })

  const hPad = isMobile ? '12px 16px' : '12px 40px'
  const vPad = isMobile ? '24px 16px 80px' : '32px 40px 80px'

  const sidebar = (
    <aside style={{ position: isMobile ? 'static' : 'sticky', top: '108px' }}>
      <FilterSection title="Disponibilidad">
        <CheckboxItem label="Nuevos" checked={filterNew} onChange={() => setFilterNew(v => !v)} />
      </FilterSection>

      <FilterSection title="Talles">
        {['XS', 'S', 'M', 'L', 'XL'].map(s => {
          const count = mockProducts.filter(p => p.sizes.includes(s) && (!categoria || p.category === categoria)).length
          return count > 0 ? (
            <CheckboxItem key={s} label={s} count={count} checked={false} onChange={() => {}} />
          ) : null
        })}
      </FilterSection>

      {filterNew && (
        <button
          onClick={() => setFilterNew(false)}
          style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-accent)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
        >
          Limpiar filtros
        </button>
      )}
    </aside>
  )

  return (
    <div style={{ background: 'var(--color-bg)', minHeight: '100vh' }}>

      {/* Breadcrumb */}
      <div style={{ borderBottom: '1px solid var(--color-border)', padding: hPad }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', gap: '8px', alignItems: 'center', fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-muted)' }}>
          <Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>Home</Link>
          <span>›</span>
          <span style={{ color: 'var(--color-on-bg)' }}>{currentCat ? currentCat.label : 'Catálogo'}</span>
        </div>
      </div>

      {/* Título */}
      <div style={{ textAlign: 'center', padding: isMobile ? '28px 16px 20px' : '40px 40px 28px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2rem, 4vw, 3rem)', color: 'var(--color-on-bg)' }}>
          {currentCat ? currentCat.label : 'Todo el catálogo'}
        </h1>
      </div>

      <div style={{ borderTop: '1px solid var(--color-border)', maxWidth: '1280px', margin: '0 auto' }} />

      {/* Toolbar */}
      <div style={{ maxWidth: '1280px', margin: '0 auto', padding: isMobile ? '12px 16px' : '16px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <button
          onClick={() => setSidebarOpen(o => !o)}
          style={{ display: 'flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-on-bg)', padding: 0 }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>tune</span>
          {sidebarOpen ? 'Ocultar filtros' : 'Mostrar filtros'}
        </button>

        <span style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-muted)' }}>
          {sorted.length} resultado{sorted.length !== 1 ? 's' : ''}
        </span>

        <select
          value={sort}
          onChange={e => setSort(e.target.value)}
          style={{ background: 'none', border: 'none', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-on-bg)', cursor: 'pointer', outline: 'none' }}
        >
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>

      <div style={{ borderTop: '1px solid var(--color-border)', maxWidth: '1280px', margin: '0 auto' }} />

      {/* Contenido */}
      <div
        style={{
          maxWidth: '1280px',
          margin: '0 auto',
          padding: vPad,
          display: 'grid',
          gridTemplateColumns: (!isMobile && sidebarOpen) ? '240px 1fr' : '1fr',
          gap: isMobile ? '24px' : '48px',
          alignItems: 'start',
        }}
      >
        {/* Sidebar — en mobile aparece encima del grid (stacked), en desktop es columna lateral */}
        {sidebarOpen && sidebar}

        {/* Grid de productos */}
        {sorted.length > 0 ? (
          <div style={{ display: 'grid', gridTemplateColumns: isMobile ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)', gap: isMobile ? '16px 12px' : '24px 20px' }}>
            {sorted.map(p => <CatalogCard key={p.id} product={p} />)}
          </div>
        ) : (
          <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--color-muted)' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '48px', display: 'block', marginBottom: '12px', opacity: 0.35 }}>search_off</span>
            <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', marginBottom: '8px' }}>Sin resultados</p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px' }}>Probá ajustando los filtros.</p>
          </div>
        )}
      </div>
    </div>
  )
}
