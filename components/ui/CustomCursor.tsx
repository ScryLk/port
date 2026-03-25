'use client'
import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = ref.current
    if (!cursor) return

    const move = (e: MouseEvent) => {
      cursor.style.left = `${e.clientX}px`
      cursor.style.top = `${e.clientY}px`
    }

    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [])

  return <div ref={ref} className="custom-cursor" />
}
