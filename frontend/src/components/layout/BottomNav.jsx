import { NavLink } from 'react-router-dom'

const items = [
  { icon: 'home', label: 'Inicio', to: '/', disabled: false },
  { icon: 'search', label: 'Buscar', to: '/catalogo', disabled: false },
  { icon: 'shopping_bag', label: 'Bolsa', to: '/carrito', disabled: false },
  { icon: 'person', label: 'Cuenta', to: '/cuenta', disabled: true },
]

export default function BottomNav() {
  return (
    <nav
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: 'var(--color-header-bg)',
        borderTop: '1px solid rgba(242,234,216,0.12)',
        zIndex: 40,
        height: '60px',
      }}
      className="flex md:hidden"
    >
      {items.map(item => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          onClick={item.disabled ? e => e.preventDefault() : undefined}
          style={({ isActive }) => ({
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3px',
            color: isActive ? 'var(--color-accent)' : 'rgba(242,234,216,0.55)',
            textDecoration: 'none',
            fontSize: '9px',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            fontFamily: 'var(--font-body)',
            fontWeight: 500,
            transition: 'color 0.15s',
          })}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
    </nav>
  )
}
