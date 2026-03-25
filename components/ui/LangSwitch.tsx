'use client'
import { motion } from 'framer-motion'
import { useI18n } from '@/lib/i18n'

export function LangSwitch() {
  const { locale, toggleLocale } = useI18n()

  return (
    <button
      onClick={toggleLocale}
      style={{
        position: 'fixed',
        top: 24,
        right: 24,
        zIndex: 50,
        fontFamily: 'var(--font-mono), monospace',
        fontSize: 10,
        letterSpacing: '0.15em',
        padding: '6px 14px',
        borderRadius: 4,
        border: '0.5px solid rgba(0,200,224,0.3)',
        background: 'rgba(0,200,224,0.04)',
        color: '#00c8e0',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        gap: 6,
        pointerEvents: 'auto',
      }}
    >
      <motion.span
        key={locale}
        initial={{ opacity: 0, y: -4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        {locale === 'pt' ? 'EN' : 'PT'}
      </motion.span>
    </button>
  )
}
