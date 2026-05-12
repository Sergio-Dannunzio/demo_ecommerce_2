import { useState, useEffect } from 'react'
import { announcements } from '../../brand.config'

export default function AnnouncementBar() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const t = setInterval(() => {
      setIndex(i => (i + 1) % announcements.length)
    }, 3500)
    return () => clearInterval(t)
  }, [])

  return (
    <div
      style={{
        background: 'var(--color-olive)',
        color: '#fdf8f0',
        fontSize: '11px',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        textAlign: 'center',
        padding: '7px 16px',
        fontFamily: 'var(--font-body)',
        fontWeight: 500,
      }}
    >
      {announcements[index]}
    </div>
  )
}
