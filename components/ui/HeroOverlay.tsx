'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useActiveSection } from '@/hooks/useActiveSection'
import { useI18n } from '@/lib/i18n'

export function HeroOverlay() {
  const active = useActiveSection() === 'hero'
  const { t } = useI18n()

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="hero"
          initial={{ opacity: 0, y: 20 }}
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
          {/* Glow radial behind text */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 600,
              height: 400,
              background: 'radial-gradient(ellipse at center, rgba(0,200,224,0.12) 0%, rgba(0,200,224,0.04) 40%, transparent 70%)',
              filter: 'blur(40px)',
              pointerEvents: 'none',
            }}
          />

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            style={{ fontFamily: 'monospace', fontSize: 11, color: '#00c8e0', letterSpacing: '0.3em', marginBottom: 14 }}
          >
            {t('hero.label')}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
            style={{
              fontSize: 'clamp(56px, 9vw, 120px)',
              fontWeight: 800,
              color: '#fff',
              letterSpacing: '-3px',
              lineHeight: 1,
              textShadow: '0 0 60px rgba(0,200,224,0.35), 0 0 120px rgba(0,200,224,0.15), 0 2px 4px rgba(0,0,0,0.5)',
            }}
          >
            LUCAS
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.45, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            style={{ fontSize: 15, color: '#fff', marginTop: 14 }}
          >
            {t('hero.subtitle')}
          </motion.p>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            style={{ fontFamily: 'monospace', fontSize: 10, color: '#00c8e0', marginTop: 28 }}
          >
            {t('hero.cta')}
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
