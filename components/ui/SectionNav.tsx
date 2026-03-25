'use client'
import { useCallback, useState } from 'react'
import { motion } from 'framer-motion'
import { useActiveSection } from '@/hooks/useActiveSection'
import { SECTIONS } from '@/lib/scrollMap'
import { useI18n } from '@/lib/i18n'

const NAV_ITEMS = [
  { id: 'hero', key: 'nav.home' },
  { id: 'about', key: 'nav.about' },
  { id: 'work-a', key: 'nav.projects' },
  { id: 'stack', key: 'nav.stack' },
  { id: 'contact', key: 'nav.contact' },
]

export function SectionNav() {
  const activeSection = useActiveSection()
  const { t } = useI18n()
  const [hovered, setHovered] = useState<string | null>(null)

  const scrollTo = useCallback((sectionId: string) => {
    const section = SECTIONS.find(s => s.id === sectionId)
    if (!section) return
    const totalH = document.body.scrollHeight - window.innerHeight
    const target = section.start * totalH + 1
    window.scrollTo({ top: target, behavior: 'smooth' })
  }, [])

  const isActive = (id: string) => {
    if (id === 'work-a') {
      return activeSection === 'work-a' || activeSection === 'work-b' || activeSection === 'work-c'
    }
    return activeSection === id
  }

  return (
    <nav
      style={{
        position: 'fixed',
        right: 24,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: 4,
        pointerEvents: 'auto',
      }}
    >
      {NAV_ITEMS.map((item) => {
        const active = isActive(item.id)
        const show = active || hovered === item.id
        return (
          <button
            key={item.id}
            onClick={() => scrollTo(item.id)}
            onMouseEnter={() => setHovered(item.id)}
            onMouseLeave={() => setHovered(null)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '6px 0',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            <motion.span
              animate={{
                opacity: show ? 1 : 0,
                x: show ? 0 : 8,
              }}
              transition={{ duration: 0.25 }}
              style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 10,
                letterSpacing: '0.15em',
                color: '#00c8e0',
                textTransform: 'uppercase',
                whiteSpace: 'nowrap',
              }}
            >
              {t(item.key)}
            </motion.span>

            <motion.div
              animate={{
                width: active ? 24 : hovered === item.id ? 18 : 12,
                background: active ? '#00c8e0' : hovered === item.id ? 'rgba(0,200,224,0.5)' : 'rgba(0,200,224,0.25)',
                boxShadow: active ? '0 0 8px rgba(0,200,224,0.5)' : '0 0 0px transparent',
              }}
              transition={{ duration: 0.25 }}
              style={{
                height: 2,
                borderRadius: 1,
              }}
            />
          </button>
        )
      })}
    </nav>
  )
}
