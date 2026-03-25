'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n } from '@/lib/i18n'

export function LoadingScreen() {
  const [done, setDone] = useState(false)
  const [fakeProgress, setFakeProgress] = useState(0)
  const raf = useRef<number>(0)
  const start = useRef(Date.now())
  const { t } = useI18n()

  useEffect(() => {
    const duration = 1800
    const tick = () => {
      const elapsed = Date.now() - start.current
      const t = Math.min(elapsed / duration, 1)
      // ease-out curve
      const eased = 1 - Math.pow(1 - t, 3)
      setFakeProgress(Math.round(eased * 100))

      if (t < 1) {
        raf.current = requestAnimationFrame(tick)
      } else {
        setTimeout(() => setDone(true), 400)
      }
    }
    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
          style={{
            position: 'fixed', inset: 0, zIndex: 9999,
            background: '#020b16',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            gap: 24,
          }}
        >
          <p style={{ fontFamily: 'monospace', fontSize: 11, color: '#00c8e0', letterSpacing: '0.4em', opacity: 0.6 }}>
            {t('loading.text')}
          </p>
          <div style={{ width: 240, height: 1, background: 'rgba(0,200,224,0.15)' }}>
            <motion.div
              style={{ height: 1, background: '#00c8e0', originX: 0 }}
              animate={{ scaleX: fakeProgress / 100 }}
              transition={{ ease: 'linear' }}
            />
          </div>
          <p style={{ fontFamily: 'monospace', fontSize: 12, color: '#00c8e0' }}>
            {fakeProgress}%
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
