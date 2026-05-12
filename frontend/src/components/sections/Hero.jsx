import { Link } from 'react-router-dom'
import { hero } from '../../brand.config'
import heroBg from '../../assets/brand/hero_3.jpg'

function scrollToElement(id, duration = 2000) {
  const el = document.getElementById(id)
  if (!el) return
  const startY = window.scrollY
  const targetY = el.getBoundingClientRect().top + startY - 40
  const distance = targetY - startY
  const startTime = performance.now()

  const ease = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

  function step(now) {
    const progress = Math.min((now - startTime) / duration, 1)
    window.scrollTo(0, startY + distance * ease(progress))
    if (progress < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

export default function Hero() {
  return (
    <section
      style={{
        position: 'relative',
        minHeight: 'calc(100vh - var(--header-h))',
        background: 'var(--color-primary)',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Background image */}
      <img
        src={heroBg}
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center calc(50% - 100px)',
          opacity: 0.45,
        }}
      />

      {/* Grain overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix type='saturate' values='0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.08'/%3E%3C/svg%3E")`,
          backgroundRepeat: 'repeat',
          backgroundSize: '200px 200px',
          pointerEvents: 'none',
          mixBlendMode: 'soft-light',
          zIndex: 1,
        }}
      />

      {/* Decorative corner marks */}
      {[
        { top: 32, left: 32 },
        { top: 32, right: 32 },
        { bottom: 32, left: 32 },
        { bottom: 32, right: 32 },
      ].map((pos, i) => (
        <span
          key={i}
          style={{
            position: 'absolute',
            ...pos,
            width: 24,
            height: 24,
            borderTop: i < 2 ? '1.5px solid rgba(242,234,216,0.25)' : 'none',
            borderBottom: i >= 2 ? '1.5px solid rgba(242,234,216,0.25)' : 'none',
            borderLeft: i % 2 === 0 ? '1.5px solid rgba(242,234,216,0.25)' : 'none',
            borderRight: i % 2 !== 0 ? '1.5px solid rgba(242,234,216,0.25)' : 'none',
            zIndex: 2,
          }}
        />
      ))}

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 3,
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '80px 20px',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
        }}
      >
        {/* Badge */}
        <span
          style={{
            fontFamily: 'var(--font-accent)',
            fontSize: '15px',
            color: 'var(--color-accent)',
            letterSpacing: '0.04em',
          }}
        >
          ✦ {hero.badge}
        </span>

        {/* Heading */}
        <h1
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(3rem, 8vw, 7rem)',
            color: 'var(--color-on-primary)',
            lineHeight: 1.05,
            maxWidth: '700px',
            whiteSpace: 'pre-line',
          }}
        >
          {hero.heading}
        </h1>

        {/* Sub */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '16px',
            color: 'rgba(242,234,216,0.65)',
            maxWidth: '380px',
            lineHeight: 1.7,
          }}
        >
          {hero.sub}
        </p>

        {/* CTAs */}
        <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
          <Link to={hero.ctaPrimary.to} className="btn-primary">
            {hero.ctaPrimary.label}
            <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
          </Link>
          <button
            className="btn-fill-slide"
            onClick={() => scrollToElement('looks-carousel', 1200)}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'rgba(242,234,216,0.75)',
              background: 'none',
              border: '1px solid rgba(242,234,216,0.3)',
              padding: '12px 24px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              alignSelf: 'center',
              transition: 'color 0.15s, border-color 0.15s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#f2ead8'; e.currentTarget.style.borderColor = 'rgba(242,234,216,0.6)' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(242,234,216,0.75)'; e.currentTarget.style.borderColor = 'rgba(242,234,216,0.3)' }}
          >
            {hero.ctaSecondary.label}
          </button>
        </div>

        {/* Scroll hint */}
        <div
          style={{
            position: 'absolute',
            bottom: 32,
            right: 20,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '6px',
            opacity: 0.4,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10px',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-on-primary)',
              writingMode: 'vertical-rl',
            }}
          >
            scroll
          </span>
          <span className="material-symbols-outlined" style={{ fontSize: '18px', color: 'var(--color-on-primary)' }}>
            arrow_downward
          </span>
        </div>
      </div>
    </section>
  )
}
