import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { brand, nav } from '../../brand.config'
import { logo } from '../../assets/brand-assets'
import AnnouncementBar from './AnnouncementBar'

function MobileNavItem({ item, onClose }) {
  const [open, setOpen] = useState(false)
  const hasGroups = item.groups.length > 0

  const rowStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: '14px 20px',
    borderBottom: '1px solid rgba(44,26,14,0.07)',
    background: 'none',
    border: 'none',
    borderBottom: '1px solid rgba(44,26,14,0.07)',
    cursor: 'pointer',
    textDecoration: 'none',
  }

  const labelStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: '13px',
    fontWeight: 700,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--color-header-text)',
  }

  if (!hasGroups) {
    return (
      <NavLink
        to={`/catalogo/${item.slug}`}
        onClick={item.slug === 'ofertas' ? e => e.preventDefault() : onClose}
        style={({ isActive }) => ({
          ...rowStyle,
          display: 'flex',
          color: isActive ? 'var(--color-accent)' : 'var(--color-header-text)',
          cursor: item.slug === 'ofertas' ? 'default' : 'pointer',
        })}
      >
        <span style={labelStyle}>{item.label}</span>
        <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--color-muted)' }}>
          arrow_forward
        </span>
      </NavLink>
    )
  }

  return (
    <div style={{ borderBottom: '1px solid rgba(44,26,14,0.07)' }}>
      {/* Fila principal — toggle */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          ...rowStyle,
          borderBottom: 'none',
          width: '100%',
        }}
      >
        <span style={labelStyle}>{item.label}</span>
        <span
          className="material-symbols-outlined"
          style={{ fontSize: '20px', color: 'var(--color-muted)', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'rotate(0deg)' }}
        >
          expand_more
        </span>
      </button>

      {/* Sub-items */}
      {open && (
        <div style={{ background: 'var(--color-header-bg)', paddingBottom: '8px' }}>
          {/* "Ver todo" */}
          <NavLink
            to={`/catalogo/${item.slug}`}
            onClick={onClose}
            style={{ display: 'block', padding: '10px 20px 10px 28px', fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: 600, color: 'var(--color-accent)', textDecoration: 'none', letterSpacing: '0.04em' }}
          >
            Ver todo en {item.label.charAt(0) + item.label.slice(1).toLowerCase()}
          </NavLink>

          {/* Grupos y links */}
          {item.groups.map(group => (
            <div key={group.heading} style={{ paddingTop: '8px' }}>
              <p style={{ padding: '4px 20px 4px 28px', fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-muted)' }}>
                {group.heading}
              </p>
              {group.links.map(link => (
                <NavLink
                  key={link}
                  to={`/catalogo/${item.slug}`}
                  onClick={onClose}
                  style={{ display: 'block', padding: '8px 20px 8px 36px', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-on-bg)', textDecoration: 'none', letterSpacing: '0.01em' }}
                >
                  {link}
                </NavLink>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)

  const activeNav = nav.find(n => n.slug === activeDropdown)
  const closeMobile = () => setMobileOpen(false)

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'var(--color-header-bg)',
        color: 'var(--color-header-text)',
        boxShadow: '0 1px 0 rgba(44,26,14,0.08)',
      }}
      onMouseLeave={() => setActiveDropdown(null)}
    >
      <AnnouncementBar />

      {/* Inner bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '60px',
          padding: '0 20px',
          maxWidth: '1280px',
          margin: '0 auto',
        }}
      >
        {/* Logo */}
        <Link
          to="/"
          aria-label={brand.name}
          onClick={closeMobile}
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', flex: 1 }}
        >
          {logo ? (
            <img
              src={logo}
              alt={brand.name}
              style={{ height: '52px', width: 'auto', objectFit: 'contain', display: 'block' }}
            />
          ) : (
            <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.45rem', color: 'var(--color-header-text)', letterSpacing: '-0.01em' }}>
              {brand.name}
            </span>
          )}
        </Link>

        {/* Desktop nav */}
        <nav style={{ gap: '32px', alignItems: 'center' }} className="hidden md:flex">
          {nav.map(item => (
            <div
              key={item.slug}
              onMouseEnter={() => item.groups.length > 0 ? setActiveDropdown(item.slug) : setActiveDropdown(null)}
            >
              <NavLink
                to={`/catalogo/${item.slug}`}
                onClick={item.slug === 'ofertas' ? e => e.preventDefault() : undefined}
                style={({ isActive }) => ({
                  fontFamily: 'var(--font-body)',
                  fontSize: '11px',
                  fontWeight: 600,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: isActive || activeDropdown === item.slug ? 'var(--color-accent)' : 'var(--color-header-text)',
                  textDecoration: 'none',
                  transition: 'color 0.15s',
                  paddingBottom: '4px',
                  borderBottom: activeDropdown === item.slug ? '1.5px solid var(--color-accent)' : '1.5px solid transparent',
                  cursor: item.slug === 'ofertas' ? 'default' : 'pointer',
                })}
              >
                {item.label}
              </NavLink>
            </div>
          ))}
        </nav>

        {/* Actions */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '16px', flex: 1 }}>
          <button aria-label="Buscar" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-header-text)', display: 'flex' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>search</span>
          </button>
          <button aria-label="Mi cuenta" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-header-text)' }} className="hidden md:flex">
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>person</span>
          </button>
          <Link to="/carrito" aria-label="Carrito" onClick={closeMobile} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-header-text)', display: 'flex', position: 'relative', textDecoration: 'none' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>shopping_bag</span>
            <span style={{ position: 'absolute', top: '-5px', right: '-6px', background: 'var(--color-accent)', color: '#fff', fontSize: '10px', fontWeight: 700, width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              0
            </span>
          </Link>
          <button
            aria-label="Menú"
            onClick={() => setMobileOpen(o => !o)}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-header-text)' }}
            className="flex md:hidden"
          >
            <span className="material-symbols-outlined" style={{ fontSize: '26px' }}>
              {mobileOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* ── Mega menu (desktop) ──────────────────────────────────── */}
      {activeNav && activeNav.groups.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'var(--color-surface)',
            borderBottom: '1px solid var(--color-border)',
            boxShadow: '0 12px 40px rgba(44,26,14,0.10)',
            zIndex: 49,
          }}
        >
          <div
            style={{
              maxWidth: '1280px',
              margin: '0 auto',
              padding: '40px 20px',
              display: 'flex',
              gap: '0',
            }}
          >
            {activeNav.groups.map((group, i) => (
              <div
                key={group.heading}
                style={{
                  flex: 1,
                  paddingLeft: i === 0 ? 0 : '40px',
                  borderLeft: i === 0 ? 'none' : '1px solid var(--color-border)',
                }}
              >
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 700,
                    color: 'var(--color-on-bg)',
                    marginBottom: '14px',
                    letterSpacing: '0.01em',
                  }}
                >
                  {group.heading}
                </p>
                <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {group.links.map(link => (
                    <li key={link}>
                      <Link
                        to={`/catalogo/${activeNav.slug}`}
                        onClick={() => setActiveDropdown(null)}
                        style={{
                          fontFamily: 'var(--font-body)',
                          fontSize: '13px',
                          color: 'var(--color-muted)',
                          textDecoration: 'none',
                          transition: 'color 0.15s',
                        }}
                        onMouseEnter={e => e.currentTarget.style.color = 'var(--color-on-bg)'}
                        onMouseLeave={e => e.currentTarget.style.color = 'var(--color-muted)'}
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── Mobile drawer (acordeón) ─────────────────────────────── */}
      {mobileOpen && (
        <div
          className="md:hidden"
          style={{
            background: 'var(--color-header-bg)',
            borderTop: '1px solid rgba(44,26,14,0.08)',
            maxHeight: 'calc(100vh - 92px)',
            overflowY: 'auto',
          }}
        >
          {/* Categorías con acordeón */}
          {nav.map(item => (
            <MobileNavItem key={item.slug} item={item} onClose={closeMobile} />
          ))}

          {/* Acciones extra */}
          <div style={{ padding: '16px 20px', borderTop: '2px solid rgba(44,26,14,0.06)', display: 'flex', gap: '12px' }}>
            <span
              style={{ display: 'flex', alignItems: 'center', gap: '6px', fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-muted)', cursor: 'default' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>person</span>
              Mi cuenta
            </span>
          </div>
        </div>
      )}
    </header>
  )
}
