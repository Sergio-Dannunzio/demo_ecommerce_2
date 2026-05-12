import Hero from '../components/sections/Hero'
import LooksCarousel from '../components/sections/LooksCarousel'
import EditorialFeature from '../components/sections/EditorialFeature'
import EditorialFeatureAlt from '../components/sections/EditorialFeatureAlt'
import CategoryCards from '../components/sections/CategoryCards'
import CategoryBanner from '../components/sections/CategoryBanner'

export default function HomePage() {
  return (
    <>
      <Hero />
      <LooksCarousel />
      <EditorialFeature />
      <EditorialFeatureAlt />
      <CategoryCards />
      <CategoryBanner />
    </>
  )
}
