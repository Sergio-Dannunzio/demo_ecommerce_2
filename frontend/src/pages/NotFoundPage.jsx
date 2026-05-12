import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        background: 'var(--color-bg)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '24px',
        textAlign: 'center',
        padding: '40px 20px',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-accent)',
          fontSize: '96px',
          color: 'var(--color-border)',
          lineHeight: 1,
        }}
      >
        404
      </span>
      <h1
        style={{
          fontFamily: 'var(--font-heading)',
          fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
          color: 'var(--color-on-bg)',
        }}
      >
        Esta página no existe
      </h1>
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: '14px',
          color: 'var(--color-muted)',
          maxWidth: '340px',
          lineHeight: 1.7,
        }}
      >
        Quizás la prenda ya fue vendida, o la URL tiene un error.
      </p>
      <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <Link to="/" className="btn-primary">Volver al inicio</Link>
        <Link to="/catalogo" className="btn-outline">Ver catálogo</Link>
      </div>
    </div>
  )
}
