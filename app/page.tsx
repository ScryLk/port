'use client'
import dynamic from 'next/dynamic'
import { HeroOverlay } from '@/components/ui/HeroOverlay'
import { AboutOverlay } from '@/components/ui/AboutOverlay'
import { WorkOverlay } from '@/components/ui/WorkOverlay'
import { StackOverlay } from '@/components/ui/StackOverlay'
import { ContactOverlay } from '@/components/ui/ContactOverlay'
import { LoadingScreen } from '@/components/ui/LoadingScreen'
import { ProjectModal } from '@/components/ui/ProjectModal'
import { SectionNav } from '@/components/ui/SectionNav'

const Scene = dynamic(
  () => import('@/components/scene/Scene').then(mod => ({ default: mod.Scene })),
  { ssr: false }
)

const SCROLL_HEIGHT = '700vh'

export default function Home() {
  return (
    <>
      <LoadingScreen />
      <Scene />
      <div style={{ height: SCROLL_HEIGHT }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 10, pointerEvents: 'none' }}>
        <HeroOverlay />
        <AboutOverlay />
        <WorkOverlay />
        <StackOverlay />
        <ContactOverlay />
      </div>
      <SectionNav />
      <ProjectModal />
    </>
  )
}
