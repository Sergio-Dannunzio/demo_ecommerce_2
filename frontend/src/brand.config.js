export const brand = {
  name: 'Second Hand',
  tagline: 'Piezas únicas. Historia en cada costura.',
  description: 'Ropa vintage y de segunda mano seleccionada a mano. Cada prenda tiene su historia.',
  year: '2026',
  email: 'hola@seccondhand.com',
  instagram: '@seccondhand',
}

export const fonts = {
  googleUrl:
    'https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Libre+Franklin:wght@300;400;500;600&family=Caveat:wght@400;600&display=swap',
  heading: "'DM Serif Display', serif",
  body: "'Libre Franklin', sans-serif",
  accent: "'Caveat', cursive",
}

export const colors = {
  background: '#f2ead8',
  surface: '#e8ddc4',
  surfaceAlt: '#ede3cc',
  onBackground: '#2c1a0e',
  onSurface: '#3d2812',
  muted: '#8a7a68',
  border: '#c4b49a',
  borderStrong: '#8a7060',

  primary: '#2c1a0e',
  onPrimary: '#f2ead8',

  accent: '#b8633a',
  accentHover: '#9e5230',
  onAccent: '#fdf8f0',

  olive: '#5a6b3a',
  oliveLight: '#7a8c5c',

  tag: '#e0d0b0',
  tagText: '#5a4030',

  headerBg: '#ffffff',
  headerText: '#2c1a0e',
  footerBg: '#1e1008',
  footerText: '#c4b49a',
}

export const nav = [
  {
    label: 'MUJER',
    slug: 'mujer',
    groups: [
      { heading: 'Tops', links: ['Remeras', 'Blusas', 'Camisas'] },
      { heading: 'Bottoms', links: ['Pantalones', 'Faldas', 'Shorts'] },
      { heading: 'Outerwear', links: ['Camperas', 'Sacos', 'Abrigos'] },
    ],
  },
  {
    label: 'HOMBRE',
    slug: 'hombre',
    groups: [
      { heading: 'Tops', links: ['Remeras', 'Camisas', 'Buzos'] },
      { heading: 'Bottoms', links: ['Pantalones', 'Shorts', 'Jeans'] },
      { heading: 'Outerwear', links: ['Camperas', 'Sacos'] },
    ],
  },
  {
    label: 'ACCESORIOS',
    slug: 'accesorios',
    groups: [
      { heading: 'Todo', links: ['Bolsos', 'Cinturones', 'Joyería', 'Gorros'] },
    ],
  },
  {
    label: 'OFERTAS',
    slug: 'ofertas',
    groups: [],
  },
]

export const announcements = [
  'Envíos a todo el país  ✦',
  'Cambios y devoluciones en 10 días  ✦',
  'Prendas únicas — sin reposición  ✦',
]

export const trustBar = [
  { icon: 'local_shipping', label: 'Envío a todo el país', sub: 'Gratis desde $30.000' },
  { icon: 'autorenew', label: 'Cambios fáciles', sub: 'Hasta 10 días' },
  { icon: 'verified', label: 'Prendas verificadas', sub: 'Calidad garantizada' },
  { icon: 'eco', label: 'Moda circular', sub: 'Dale una segunda vida' },
]

export const hero = {
  badge: 'Nueva colección',
  heading: 'Vintage\nseleccionado\na mano.',
  sub: 'Piezas únicas con historia. Sin reposición.',
  ctaPrimary: { label: 'Explorar tienda', to: '/catalogo' },
  ctaSecondary: { label: 'Nuestra historia', to: '/nosotros' },
}

export const categories = [
  { label: 'Mujer', slug: 'mujer', count: '48 piezas' },
  { label: 'Hombre', slug: 'hombre', count: '32 piezas' },
  { label: 'Accesorios', slug: 'accesorios', count: '21 piezas' },
  { label: 'Ofertas', slug: 'ofertas', count: '15 piezas' },
]

export const footer = {
  columns: [
    {
      heading: 'Tienda',
      links: ['Mujer', 'Hombre', 'Accesorios', 'Ofertas'],
    },
    {
      heading: 'Ayuda',
      links: ['Cómo comprar', 'Envíos', 'Cambios y devoluciones', 'Contacto'],
    },
    {
      heading: 'Nosotros',
      links: ['Nuestra historia', 'Sustentabilidad', 'Vendé con nosotros'],
    },
  ],
  social: ['instagram', 'tiktok', 'pinterest'],
}
