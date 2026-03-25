'use client'
import { useState, useEffect, useCallback } from 'react'
import { useScroll } from '@/components/providers/ScrollProvider'
import { getActiveSection } from '@/lib/scrollMap'

export function useActiveSection() {
  const { progress } = useScroll()
  const [section, setSection] = useState('hero')

  const update = useCallback(() => {
    const next = getActiveSection(progress.current)
    setSection(prev => (prev !== next ? next : prev))
  }, [progress])

  useEffect(() => {
    let raf: number
    const loop = () => {
      update()
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [update])

  return section
}
