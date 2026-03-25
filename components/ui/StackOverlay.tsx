'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useActiveSection } from '@/hooks/useActiveSection'

const STACKS = [
  { category: 'Frontend', items: ['React', 'Next.js', 'React Native', 'Three.js', 'Tailwind'] },
  { category: 'Backend', items: ['Node.js', 'Fastify', 'Django', 'Spring Boot'] },
  { category: 'Data', items: ['PostgreSQL', 'Redis', 'Prisma'] },
  { category: 'Infra', items: ['Docker', 'Vercel', 'AWS'] },
]

export function StackOverlay() {
  const active = useActiveSection() === 'stack'

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="stack"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            pointerEvents: 'none',
          }}
        >
          <p style={{ fontFamily: 'monospace', fontSize: 11, color: '#00c8e0', letterSpacing: '0.3em', marginBottom: 24 }}>
            TECH STACK
          </p>
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
            {STACKS.map(group => (
              <div key={group.category}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 8 }}>
                  {group.category}
                </p>
                {group.items.map(item => (
                  <p key={item} style={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', lineHeight: 1.8 }}>
                    {item}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
