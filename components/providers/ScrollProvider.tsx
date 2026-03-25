'use client'
import { createContext, useContext, useRef, useEffect, useCallback, type ReactNode } from 'react'
import Lenis from 'lenis'

interface ScrollCtxValue {
  progress: { current: number }
  pause: () => void
  resume: () => void
}

const ScrollCtx = createContext<ScrollCtxValue>({
  progress: { current: 0 },
  pause: () => {},
  resume: () => {},
})

export function ScrollProvider({ children }: { children: ReactNode }) {
  const progress = useRef(0)
  const lenisRef = useRef<Lenis | null>(null)

  const pause = useCallback(() => lenisRef.current?.stop(), [])
  const resume = useCallback(() => lenisRef.current?.start(), [])

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.08, smoothWheel: true })
    lenisRef.current = lenis

    const totalH = document.body.scrollHeight - window.innerHeight
    lenis.on('scroll', ({ scroll }: { scroll: number }) => {
      progress.current = totalH > 0 ? scroll / totalH : 0
    })

    const raf = (t: number) => {
      lenis.raf(t)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])

  return (
    <ScrollCtx.Provider value={{ progress, pause, resume }}>
      {children}
    </ScrollCtx.Provider>
  )
}

export const useScroll = () => useContext(ScrollCtx)
