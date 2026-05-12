import { useState } from 'react'
import { Link } from 'react-router-dom'
import look1 from '../assets/products/looks/look_1.jpg'

const INITIAL_ITEMS = [
  {
    id: 1,
    brand: 'Sin marca',
    name: 'Campera de cuero vintage',
    color: 'Marrón',
    talle: 'M',
    price: 28000,
    img: look1,
    qty: 1,
  },
]

function fmt(n) {
  return '$' + n.toLocaleString('es-AR')
}

function QtyControl({ qty, onInc, onDec }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      {[['−', onDec], [qty, null], ['+', onInc]].map(([label, fn], i) => (
        <div
          key={i}
          onClick={fn || undefined}
          style={{
            width: i === 1 ? '44px' : '32px',
            height: '32px',
            border: '1px solid var(--color-border)',
            borderLeft: i > 0 ? 'none' : '1px solid var(--color-border)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: 'var(--font-body)',
            fontSize: i === 1 ? '13px' : '16px',
            fontWeight: i === 1 ? '600' : '400',
            color: 'var(--color-on-bg)',
            cursor: fn ? 'pointer' : 'default',
            userSelect: 'none',
            background: 'var(--color-surface)',
            transition: 'background 0.15s',
          }}
          onMouseEnter={e => fn && (e.currentTarget.style.background = 'var(--color-surface-alt)')}
          onMouseLeave={e => fn && (e.currentTarget.style.background = 'var(--color-surface)')}
        >
          {label}
        </div>
      ))}
    </div>
  )
}

function CartItem({ item, onRemove, onChangeQty, mobile }) {
  return (
    <div style={{ borderBottom: '1px solid var(--color-border)', padding: mobile ? '20px 0' : '28px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: mobile ? '80px 1fr' : '120px 1fr auto', gap: mobile ? '14px' : '24px', alignItems: 'start' }}>

        {/* Imagen */}
        <Link to={`/producto/${item.id}`}>
          <img
            src={item.img}
            alt={item.name}
            style={{ width: '100%', height: mobile ? '100px' : '150px', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
          />
        </Link>

        {/* Info */}
        <div>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '11px', fontWeight: '600', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-muted)', margin: '0 0 3px 0' }}>
            {item.brand}
          </p>
          <p style={{ fontFamily: 'var(--font-heading)', fontSize: mobile ? '15px' : '17px', color: 'var(--color-on-bg)', margin: '0 0 6px 0', lineHeight: '1.25' }}>
            {item.name}
          </p>

          {mobile ? (
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-muted)', margin: '0 0 8px 0' }}>
              {item.color} · Talle {item.talle} · Cant. {item.qty}
            </p>
          ) : (
            <>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-muted)', margin: '0 0 2px 0' }}>Color: {item.color}</p>
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-muted)', margin: '0 0 16px 0' }}>Talle: {item.talle}</p>
            </>
          )}

          <p style={{ fontFamily: 'var(--font-heading)', fontSize: mobile ? '16px' : '18px', color: 'var(--color-on-bg)', margin: '0 0 12px 0' }}>
            {fmt(item.price * item.qty)}
          </p>

          {!mobile && <QtyControl qty={item.qty} onInc={() => onChangeQty(item.id, 1)} onDec={() => onChangeQty(item.id, -1)} />}
        </div>

        {/* Eliminar — desktop */}
        {!mobile && (
          <button onClick={() => onRemove(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-muted)', padding: '4px' }}>
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
          </button>
        )}
      </div>

      {/* Acciones — mobile */}
      {mobile && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginTop: '12px' }}>
          <QtyControl qty={item.qty} onInc={() => onChangeQty(item.id, 1)} onDec={() => onChangeQty(item.id, -1)} />
          <div style={{ width: '1px', height: '16px', backgroundColor: 'var(--color-border)' }} />
          <button onClick={() => onRemove(item.id)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-muted)', textDecoration: 'underline', padding: 0 }}>
            Eliminar
          </button>
        </div>
      )}

      {!mobile && (
        <button style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '6px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-muted)', textDecoration: 'underline', padding: 0 }}>
          <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>favorite</span>
          Guardar para después
        </button>
      )}
    </div>
  )
}

function OrderSummary({ items, subtotal, envio, total, mobile }) {
  const [promo, setPromo] = useState('')

  return (
    <div style={mobile ? {} : { position: 'sticky', top: '104px' }}>
      <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: mobile ? '1.4rem' : '1.6rem', color: 'var(--color-on-bg)', margin: mobile ? '0 0 20px 0' : '0 0 24px 0' }}>
        Resumen del pedido
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-muted)' }}>Subtotal</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-on-bg)' }}>{fmt(subtotal)}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'var(--color-muted)' }}>Envío</span>
          <span style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: envio === 0 ? 'var(--color-olive)' : 'var(--color-on-bg)' }}>
            {envio === 0 ? 'Gratis' : fmt(envio)}
          </span>
        </div>
      </div>

      <div style={{ height: '1px', backgroundColor: 'var(--color-border)', marginBottom: '16px' }} />

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '24px' }}>
        <span style={{ fontFamily: 'var(--font-body)', fontSize: '15px', fontWeight: '700', color: 'var(--color-on-bg)' }}>Total</span>
        <span style={{ fontFamily: 'var(--font-heading)', fontSize: '1.4rem', color: 'var(--color-on-bg)' }}>{fmt(total)}</span>
      </div>

      {/* Código promo */}
      <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: '600', color: 'var(--color-on-bg)', margin: '0 0 10px 0', letterSpacing: '0.04em' }}>
        Código de descuento
      </p>
      <div style={{ display: 'flex', marginBottom: '20px' }}>
        <input
          type="text"
          value={promo}
          onChange={e => setPromo(e.target.value)}
          placeholder="Ingresá el código"
          style={{
            flex: 1, padding: '11px 14px',
            fontFamily: 'var(--font-body)', fontSize: '13px',
            border: '1px solid var(--color-border)',
            borderRight: 'none',
            background: 'var(--color-surface)',
            color: 'var(--color-on-bg)',
            outline: 'none',
          }}
        />
        <button style={{ padding: '11px 18px', fontFamily: 'var(--font-body)', fontSize: '12px', fontWeight: '600', letterSpacing: '0.06em', background: 'transparent', color: 'var(--color-on-bg)', border: '1px solid var(--color-border)', cursor: 'pointer' }}>
          Aplicar
        </button>
      </div>

      {/* CTA */}
      <Link
        to="/checkout"
        style={{
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px',
          width: '100%',
          background: items.length === 0 ? 'var(--color-border)' : 'var(--color-primary)',
          color: 'var(--color-on-primary)',
          fontFamily: 'var(--font-body)', fontSize: '13px', fontWeight: '600', letterSpacing: '0.1em', textTransform: 'uppercase',
          padding: '17px', textDecoration: 'none',
          pointerEvents: items.length === 0 ? 'none' : 'auto',
          marginBottom: '14px',
          transition: 'background 0.2s',
        }}
      >
        <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>lock</span>
        Continuar con la compra
      </Link>

      {/* Nudge envío gratis */}
      {envio > 0 && subtotal > 0 && (
        <div style={{ background: 'var(--color-surface-alt)', padding: '14px', marginBottom: '12px', borderLeft: '3px solid var(--color-olive)' }}>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-on-bg)', margin: 0, lineHeight: '1.5' }}>
            Agregá {fmt(30000 - subtotal)} más para obtener <strong>envío gratis</strong>.
          </p>
        </div>
      )}

      <div style={{ border: '1px solid var(--color-border)', padding: '14px' }}>
        <p style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'var(--color-muted)', margin: 0, lineHeight: '1.6' }}>
          Cambios y devoluciones en 10 días · Prendas verificadas
        </p>
      </div>
    </div>
  )
}

export default function CartPage() {
  const [items, setItems] = useState(INITIAL_ITEMS)

  function changeQty(id, delta) {
    setItems(prev => prev.map(item => item.id === id ? { ...item, qty: Math.max(1, item.qty + delta) } : item))
  }

  function removeItem(id) {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const subtotal = items.reduce((acc, i) => acc + i.price * i.qty, 0)
  const envio    = subtotal >= 30000 ? 0 : 4900
  const total    = subtotal + envio

  const emptyState = (
    <div style={{ padding: '64px 0', textAlign: 'center' }}>
      <span className="material-symbols-outlined" style={{ fontSize: '48px', color: 'var(--color-border)', display: 'block', marginBottom: '16px' }}>shopping_bag</span>
      <p style={{ fontFamily: 'var(--font-heading)', fontSize: '1.3rem', color: 'var(--color-muted)', marginBottom: '24px' }}>Tu bolsa está vacía.</p>
      <Link to="/catalogo" className="btn-primary">
        Explorar tienda
      </Link>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)' }}>
      <div style={{ maxWidth: '1280px', margin: '0 auto' }}>

        {/* MOBILE */}
        <div className="block md:hidden" style={{ padding: '24px 16px 80px' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', color: 'var(--color-on-bg)', margin: '0 0 4px 0' }}>
            Mi bolsa
          </h1>
          <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-muted)', margin: '0 0 16px 0' }}>
            {items.length} {items.length === 1 ? 'prenda' : 'prendas'}
          </p>
          <div style={{ height: '1px', backgroundColor: 'var(--color-border)' }} />
          {items.length === 0 ? emptyState : items.map(item => (
            <CartItem key={item.id} item={item} onRemove={removeItem} onChangeQty={changeQty} mobile={true} />
          ))}
          {items.length > 0 && (
            <div style={{ marginTop: '32px' }}>
              <OrderSummary items={items} subtotal={subtotal} envio={envio} total={total} mobile={true} />
            </div>
          )}
        </div>

        {/* DESKTOP */}
        <div className="hidden md:block" style={{ padding: '48px 48px 80px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '40px' }}>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.2rem', color: 'var(--color-on-bg)', margin: 0 }}>
              Mi bolsa
            </h1>
            <Link to="/catalogo" style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--color-muted)', textDecoration: 'underline' }}>
              Seguir explorando
            </Link>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 360px', gap: '64px', alignItems: 'start' }}>
            <div>
              <div style={{ height: '1px', backgroundColor: 'var(--color-border)' }} />
              {items.length === 0 ? emptyState : items.map(item => (
                <CartItem key={item.id} item={item} onRemove={removeItem} onChangeQty={changeQty} mobile={false} />
              ))}
            </div>
            <OrderSummary items={items} subtotal={subtotal} envio={envio} total={total} mobile={false} />
          </div>
        </div>

      </div>
    </div>
  )
}
