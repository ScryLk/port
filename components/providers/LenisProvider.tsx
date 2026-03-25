'use client'
import { useEffect, useRef, type ReactNode } from 'react'
import Lenis from 'lenis'

export function LenisProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
    lenisRef.current = lenis

    const raf = (t: number) => {
      lenis.raf(t)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    return () => lenis.destroy()
  }, [])

  return <>{children}</>
}
