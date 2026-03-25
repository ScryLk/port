'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useActiveSection } from '@/hooks/useActiveSection'

export function AboutOverlay() {
  const active = useActiveSection() === 'about'

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
          <div style={{ maxWidth: 560 }}>
            <p style={{ fontFamily: 'monospace', fontSize: 11, color: '#00c8e0', letterSpacing: '0.3em', marginBottom: 16 }}>
              ABOUT
            </p>
            <h2 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontWeight: 600, color: '#fff', lineHeight: 1.2, marginBottom: 16 }}>
              Building digital products with purpose.
            </h2>
            <p style={{ fontSize: 15, color: 'rgba(255,255,255,0.55)', lineHeight: 1.7 }}>
              Full-stack developer from Panambi, RS, Brazil. Currently studying at IFFar,
              focused on creating immersive web experiences with React, Three.js, and Node.js.
              Passionate about real-time systems, 3D on the web, and developer tooling.
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
