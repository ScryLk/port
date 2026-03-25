'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useI18n } from '@/lib/i18n'

const STACK_KEYS = ['frontend', 'backend', 'data', 'infra'] as const

const STACK_ITEMS: Record<string, string[]> = {
  frontend: ['React', 'Next.js', 'React Native', 'Three.js', 'Tailwind'],
  backend: ['Node.js', 'Fastify', 'Django', 'Spring Boot'],
  data: ['PostgreSQL', 'Redis', 'Prisma'],
  infra: ['Docker', 'Vercel', 'AWS'],
}

export function StackOverlay() {
  const active = useActiveSection() === 'stack'
  const { t } = useI18n()

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
            {t('stack.label')}
          </p>
          <div style={{ display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center' }}>
            {STACK_KEYS.map(key => (
              <div key={key}>
                <p style={{ fontSize: 13, fontWeight: 600, color: '#fff', marginBottom: 8 }}>
                  {t(`stack.${key}`)}
                </p>
                {STACK_ITEMS[key].map(item => (
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
