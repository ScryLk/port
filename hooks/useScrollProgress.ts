'use client'
import { useScroll } from '@/components/providers/ScrollProvider'

export function useScrollProgress() {
  const { progress } = useScroll()
  return progress
}
