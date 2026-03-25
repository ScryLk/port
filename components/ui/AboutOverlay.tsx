'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useI18n } from '@/lib/i18n'

export function AboutOverlay() {
  const active = useActiveSection() === 'about'
  const { t } = useI18n()
  const [expanded, setExpanded] = useState(false)

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="about"
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
            padding: '0 24px',
          }}
        >
          <div style={{ maxWidth: 600 }}>
            <p style={{ fontFamily: 'monospace', fontSize: 11, color: '#00c8e0', letterSpacing: '0.3em', marginBottom: 16 }}>
              {t('about.label')}
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 600, color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>
              {t('about.heading')}
            </h2>

            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
              {t('about.summary')}
              {!expanded && (
                <button
                  onClick={() => setExpanded(true)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#00c8e0',
                    fontFamily: 'monospace',
                    fontSize: 12,
                    cursor: 'pointer',
                    pointerEvents: 'auto',
                    marginLeft: 6,
                    padding: 0,
                    borderBottom: '1px solid rgba(0,200,224,0.3)',
                  }}
                >
                  ...{t('about.readMore')}
                </button>
              )}
            </p>

            <AnimatePresence>
              {expanded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.4, ease: 'easeOut' }}
                  style={{ overflow: 'hidden' }}
                >
                  {t('about.full').split('\n').map((paragraph, i) => (
                    <p
                      key={i}
                      style={{
                        fontSize: 14,
                        color: 'rgba(255,255,255,0.55)',
                        lineHeight: 1.7,
                        marginTop: 14,
                      }}
                    >
                      {paragraph}
                    </p>
                  ))}
                  <button
                    onClick={() => setExpanded(false)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#00c8e0',
                      fontFamily: 'monospace',
                      fontSize: 12,
                      cursor: 'pointer',
                      pointerEvents: 'auto',
                      marginTop: 10,
                      padding: 0,
                      borderBottom: '1px solid rgba(0,200,224,0.3)',
                    }}
                  >
                    {t('about.readLess')}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
