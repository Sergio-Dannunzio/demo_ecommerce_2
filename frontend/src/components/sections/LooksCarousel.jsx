import { useState } from 'react'
import { useIsMobile } from '../../hooks/useIsMobile'

import look1  from '../../assets/products/looks/look_1.jpg'
import look2  from '../../assets/products/looks/look_2.jpg'
import look3  from '../../assets/products/looks/look_3.jpg'
import look4  from '../../assets/products/looks/look_4.jpg'
import look5  from '../../assets/products/looks/look_5.jpg'
import look6  from '../../assets/products/looks/look_6.jpg'
import look7  from '../../assets/products/looks/look_7.jpg'
import look8  from '../../assets/products/looks/look_8.jpg'
import look9  from '../../assets/products/looks/look_9.jpg'
import look10 from '../../assets/products/looks/look_10.jpg'

const LOOK_NAMES = [
  'Mañana parisina',
  'Hallazgo de feria',
  'Domingo vintage',
  'El look denim',
  'Archivo de otoño',
  'Dorado y usado',
  'Barrio viejo',
  'Tesoros de segunda',
  'Tarde de luz baja',
  'Día de mercado',
]

const looks = [look1, look2, look3, look4, look5, look6, look7, look8, look9, look10]

const lerp = (a, b, t) => a + (b - a) * t

export default function LooksCarousel() {
  const isMobile = useIsMobile()

  const CARD_W     = isMobile ? 260 : 460
  const CARD_H     = isMobile ? 340 : 590
  const DRAG_SPEED = isMobile ? 260 : 420

  const CONFIG = isMobile ? [
    { tx: 0,   scale: 1,    grayscale: 0,   opacity: 1,   zIndex: 10 },
    { tx: 120, scale: 0.84, grayscale: 100, opacity: 1,   zIndex: 6  },
    { tx: 210, scale: 0.70, grayscale: 100, opacity: 0.8, zIndex: 3  },
  ] : [
    { tx: 0,   scale: 1,    grayscale: 0,   opacity: 1,   zIndex: 10 },
    { tx: 190, scale: 0.84, grayscale: 100, opacity: 1,   zIndex: 6  },
    { tx: 340, scale: 0.70, grayscale: 100, opacity: 0.8, zIndex: 3  },
  ]

  function cardStyle(fracDist, isDragging) {
    const absF = Math.abs(fracDist)

    if (absF >= CONFIG.length) return null

    const lo  = Math.floor(absF)
    const hi  = Math.min(Math.ceil(absF), CONFIG.length - 1)
    const t   = absF - lo
    const cfg = (key) => lerp(CONFIG[lo][key], CONFIG[hi][key], t)

    const sign = fracDist >= 0 ? 1 : -1
    const tx   = sign * cfg('tx')

    const edgeFade = absF > CONFIG.length - 1.2
      ? Math.max(0, 1 - (absF - (CONFIG.length - 1.2)) / 0.5)
      : 1

    return {
      position:     'absolute',
      width:        CARD_W,
      height:       CARD_H,
      top:          '50%',
      left:         '50%',
      transform:    `translate(calc(-50% + ${tx}px), -50%) scale(${cfg('scale')})`,
      filter:       `grayscale(${cfg('grayscale')}%)`,
      opacity:      cfg('opacity') * edgeFade,
      zIndex:       Math.round(cfg('zIndex')),
      transition:   isDragging
        ? 'none'
        : 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1), filter 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
      cursor:       absF < 0.4 ? 'default' : 'pointer',
      borderRadius: '16px',
      overflow:     'hidden',
      flexShrink:   0,
    }
  }

  const [active,    setActive]    = useState(0)
  const [dir,       setDir]       = useState(1)
  const [dragging,  setDragging]  = useState(false)
  const [startX,    setStartX]    = useState(0)
  const [dragDelta, setDragDelta] = useState(0)
  const total = looks.length

  const goTo = (i, direction) => {
    const target = ((i % total) + total) % total
    if (direction === undefined) direction = target > active ? 1 : -1
    setDir(direction)
    setActive(target)
  }

  const handleDragEnd = () => {
    if (!dragging) return
    const frac = -dragDelta / DRAG_SPEED
    const abs  = Math.abs(frac)

    let steps = 0
    if (abs >= 0.15) {
      steps = abs < 0.5 ? (frac > 0 ? 1 : -1) : Math.round(frac)
    }

    const residual = frac - steps
    if (steps !== 0) goTo(active + steps, steps > 0 ? 1 : -1)
    setDragDelta(-residual * DRAG_SPEED)
    setDragging(false)
    setTimeout(() => setDragDelta(0), 20)
  }

  // Mouse events
  const onMouseDown = (e) => { setDragging(true); setStartX(e.clientX); setDragDelta(0) }
  const onMouseMove = (e) => { if (dragging) setDragDelta(e.clientX - startX) }
  const onMouseUp   = handleDragEnd

  // Touch events
  const onTouchStart = (e) => { setDragging(true); setStartX(e.touches[0].clientX); setDragDelta(0) }
  const onTouchMove  = (e) => { if (dragging) setDragDelta(e.touches[0].clientX - startX) }
  const onTouchEnd   = handleDragEnd

  const fracOffset = -dragDelta / DRAG_SPEED
  const range = Math.ceil(Math.abs(fracOffset)) + 3
  const visible = Array.from({ length: range * 2 + 1 }, (_, i) => i - range).map(d => ({
    d,
    idx: ((active + d) % total + total) % total,
  }))

  return (
    <section id="looks-carousel" style={{ padding: isMobile ? '56px 0' : '72px 80px', background: 'var(--color-bg)', overflow: 'hidden' }}>
      {/* Título */}
      <div style={{ textAlign: 'center', padding: '0 20px' }}>
        <span style={{ fontFamily: 'var(--font-accent)', fontSize: '14px', color: 'var(--color-accent)', display: 'block', marginBottom: '8px' }}>
          Inspiración
        </span>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 3vw, 2.5rem)', color: 'var(--color-on-bg)' }}>
          Nuestros looks
        </h2>
      </div>

      {/* Stage */}
      <div
        style={{
          position:       'relative',
          height:         CARD_H + 40,
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          cursor:         dragging ? 'grabbing' : 'grab',
          userSelect:     'none',
          touchAction:    'none',
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {visible.map(({ d, idx }) => {
          const fracDist = d - fracOffset
          const style = cardStyle(fracDist, dragging)
          if (!style) return null
          return (
            <div
              key={`${idx}-${d}`}
              style={style}
              onClick={() => {
                if (fracDist === 0 || Math.abs(dragDelta) >= 5) return
                const step = d > 0 ? 1 : -1
                goTo(active + step, step)
                setDragDelta(step * DRAG_SPEED)
                setTimeout(() => setDragDelta(0), 20)
              }}
            >
              <img
                src={looks[idx]}
                alt={`Look ${idx + 1}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', userSelect: 'none', pointerEvents: 'none', borderRadius: '16px' }}
                draggable={false}
              />
            </div>
          )
        })}
      </div>

      {/* Dots */}
      <div style={{ display: 'flex', gap: '7px', alignItems: 'center', justifyContent: 'center' }}>
        {looks.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            aria-label={`Look ${i + 1}`}
            style={{
              width:        i === active ? '22px' : '7px',
              height:       '7px',
              borderRadius: '4px',
              background:   i === active ? 'var(--color-primary)' : 'var(--color-border)',
              border:       'none',
              padding:      0,
              cursor:       'pointer',
              transition:   'width 0.3s ease, background 0.3s ease',
            }}
          />
        ))}
      </div>

      {/* Nombre del look */}
      <div style={{ position: 'relative', overflow: 'hidden', marginTop: '20px', height: '2.6rem' }}>
        {[-2, -1, 0, 1, 2].map(d => {
          const idx = ((active + d) % total + total) % total
          const tx = (d - fracOffset) * 100
          return (
            <p
              key={idx}
              style={{
                position:       'absolute',
                inset:          0,
                display:        'flex',
                alignItems:     'center',
                justifyContent: 'center',
                transform:      `translateX(${tx}%)`,
                transition:     dragging ? 'none' : 'transform 0.65s cubic-bezier(0.16, 1, 0.3, 1)',
                fontFamily:     'var(--font-heading)',
                fontStyle:      'italic',
                fontSize:       'clamp(1.2rem, 2.5vw, 2rem)',
                color:          'var(--color-on-bg)',
                letterSpacing:  '0.01em',
                margin:         0,
                whiteSpace:     'nowrap',
              }}
            >
              {LOOK_NAMES[idx]}
            </p>
          )
        })}
      </div>
    </section>
  )
}
