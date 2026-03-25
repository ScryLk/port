'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useI18n } from '@/lib/i18n'

export function ContactOverlay() {
  const active = useActiveSection() === 'contact'
  const { t } = useI18n()

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="contact"
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
          <p style={{ fontFamily: 'monospace', fontSize: 11, color: '#00c8e0', letterSpacing: '0.3em', marginBottom: 16 }}>
            {t('contact.label')}
          </p>
          <h2 style={{ fontSize: 'clamp(28px, 4vw, 48px)', fontWeight: 700, color: '#fff', marginBottom: 24 }}>
            {t('contact.heading')}
          </h2>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', flexWrap: 'wrap', pointerEvents: 'auto' }}>
            <a
              href="mailto:keplerlucas7@gmail.com"
              style={{
                fontFamily: 'monospace', fontSize: 13, color: '#00c8e0',
                textDecoration: 'none', borderBottom: '1px solid rgba(0,200,224,0.3)',
                paddingBottom: 2,
              }}
            >
              email
            </a>
            <a
              href="https://github.com/ScryLk"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'monospace', fontSize: 13, color: '#00c8e0',
                textDecoration: 'none', borderBottom: '1px solid rgba(0,200,224,0.3)',
                paddingBottom: 2,
              }}
            >
              github
            </a>
            <a
              href="https://www.linkedin.com/in/lucas-kepler/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: 'monospace', fontSize: 13, color: '#00c8e0',
                textDecoration: 'none', borderBottom: '1px solid rgba(0,200,224,0.3)',
                paddingBottom: 2,
              }}
            >
              linkedin
            </a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
