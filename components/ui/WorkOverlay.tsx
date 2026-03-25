'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useActiveSection } from '@/hooks/useActiveSection'
import { PROJECTS } from '@/data/projects'

const WORK_SECTIONS = [
  { section: 'work-a', projects: [PROJECTS[0], PROJECTS[1]], label: '01' },
  { section: 'work-b', projects: [PROJECTS[2], PROJECTS[3]], label: '02' },
  { section: 'work-c', projects: [PROJECTS[4], PROJECTS[5]], label: '03' },
]

export function WorkOverlay() {
  const activeSection = useActiveSection()

  const current = WORK_SECTIONS.find(w => w.section === activeSection)

  return (
    <AnimatePresence>
      {current && (
        <motion.div
          key={current.section}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-end',
            textAlign: 'center',
            pointerEvents: 'none',
            paddingBottom: 80,
          }}
        >
          <p style={{ fontFamily: 'monospace', fontSize: 10, color: '#00c8e0', letterSpacing: '0.3em', marginBottom: 12 }}>
            PROJECTS — {current.label}
          </p>
          {current.projects.map(p => (
            <div key={p.name} style={{ marginBottom: 8 }}>
              <p style={{ fontSize: 18, fontWeight: 600, color: '#fff' }}>{p.name}</p>
              <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', maxWidth: 400 }}>{p.description}</p>
            </div>
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
