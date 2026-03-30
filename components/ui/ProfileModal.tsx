'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useI18n, type Locale } from '@/lib/i18n'

export function ProfileModal() {
  const [isOpen, setIsOpen] = useState(false)
  const { t, locale } = useI18n()

  const close = useCallback(() => setIsOpen(false), [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (isOpen && e.key === 'Escape') close()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, close])

  return (
    <>
      <motion.button
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1, duration: 0.5 }}
        onClick={() => setIsOpen(true)}
        style={{
          fontFamily: 'var(--font-mono), monospace',
          fontSize: 11,
          padding: '8px 20px',
          borderRadius: 6,
          background: 'rgba(0,200,224,0.08)',
          border: '0.5px solid rgba(0,200,224,0.35)',
          color: '#00c8e0',
          cursor: 'pointer',
          pointerEvents: 'auto',
          marginTop: 24,
          letterSpacing: '0.05em',
          transition: 'all 0.2s',
        }}
        whileHover={{
          background: 'rgba(0,200,224,0.15)',
          borderColor: 'rgba(0,200,224,0.6)',
          scale: 1.02,
        }}
        whileTap={{ scale: 0.98 }}
      >
        {t('profile.button')}
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="profile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={close}
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 200,
                background: 'rgba(2, 11, 22, 0.9)',
                backdropFilter: 'blur(8px)',
                WebkitBackdropFilter: 'blur(8px)',
              }}
            />

            <div
              style={{
                position: 'fixed',
                inset: 0,
                zIndex: 201,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                pointerEvents: 'none',
              }}
            >
              <motion.div
                key="profile-modal"
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 10 }}
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                onClick={(e) => e.stopPropagation()}
                style={{
                  width: 'min(420px, 90vw)',
                  background: '#040d1a',
                  border: '0.5px solid rgba(0, 200, 224, 0.25)',
                  borderRadius: 14,
                  pointerEvents: 'auto',
                }}
              >
                {/* Photo + info */}
                <div style={{
                  padding: '32px 28px 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  position: 'relative',
                }}>
                  <button
                    onClick={close}
                    aria-label="Close"
                    style={{
                      position: 'absolute',
                      top: 14,
                      right: 14,
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      border: '0.5px solid rgba(0,200,224,0.2)',
                      background: 'transparent',
                      color: 'rgba(0,200,224,0.6)',
                      fontSize: 14,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    ✕
                  </button>

                  {/* Photo — objectPosition pushes face down */}
                  <div style={{
                    width: 110,
                    height: 110,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: '2px solid rgba(0,200,224,0.3)',
                    boxShadow: '0 0 30px rgba(0,200,224,0.15)',
                    marginBottom: 18,
                  }}>
                    <img
                      src="/me.png"
                      alt="Lucas"
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center 30%',
                      }}
                    />
                  </div>

                  <h2 style={{
                    fontSize: 22,
                    fontWeight: 600,
                    color: '#fff',
                    margin: 0,
                    marginBottom: 4,
                  }}>
                    Lucas
                  </h2>
                  <p style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 11,
                    color: '#00c8e0',
                    letterSpacing: '0.15em',
                    marginBottom: 4,
                  }}>
                    {t('profile.role')}
                  </p>
                  <p style={{
                    fontSize: 12,
                    color: 'rgba(255,255,255,0.35)',
                  }}>
                    23 {t('profile.years')}
                  </p>
                </div>

                <div style={{ height: 1, background: 'rgba(0,200,224,0.1)', margin: '0 28px' }} />

                {/* Info items */}
                <div style={{ padding: '20px 28px' }}>
                  {[
                    { label: t('profile.city'), value: 'Panambi — RS, Brasil' },
                    { label: t('profile.education'), value: t('profile.educationValue') },
                    { label: t('profile.age'), value: `23 ${t('profile.years')}` },
                    { label: t('profile.gender'), value: t('profile.genderValue') },
                  ].map((item) => (
                    <div key={item.label} style={{ marginBottom: 14 }}>
                      <p style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: 9,
                        color: '#00c8e0',
                        letterSpacing: '0.2em',
                        marginBottom: 4,
                      }}>
                        {item.label}
                      </p>
                      <p style={{
                        fontSize: 13,
                        color: 'rgba(255,255,255,0.6)',
                        lineHeight: 1.5,
                      }}>
                        {item.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div style={{ height: 1, background: 'rgba(0,200,224,0.1)', margin: '0 28px' }} />

                {/* Download CV */}
                <div style={{
                  padding: '18px 28px 0',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 8,
                }}>
                  <a
                    href={locale === 'pt' ? '/cv.pdf' : '/cn_en.pdf'}
                    download
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: 11,
                      padding: '10px 24px',
                      borderRadius: 6,
                      background: 'rgba(0,200,224,0.1)',
                      border: '0.5px solid rgba(0,200,224,0.4)',
                      color: '#00c8e0',
                      textDecoration: 'none',
                      transition: 'all 0.2s',
                      display: 'flex',
                      alignItems: 'center',
                      gap: 8,
                      width: 'fit-content',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(0,200,224,0.18)'
                      e.currentTarget.style.borderColor = 'rgba(0,200,224,0.6)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(0,200,224,0.1)'
                      e.currentTarget.style.borderColor = 'rgba(0,200,224,0.4)'
                    }}
                  >
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
                      <polyline points="7 10 12 15 17 10" />
                      <line x1="12" y1="15" x2="12" y2="3" />
                    </svg>
                    {t('profile.downloadCV')}
                  </a>
                  <p style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 9,
                    color: 'rgba(0,200,224,0.3)',
                  }}>
                    {t('profile.cvLang')}
                  </p>
                </div>

                <div style={{ height: 1, background: 'rgba(0,200,224,0.1)', margin: '14px 28px 0' }} />

                {/* Social links */}
                <div style={{
                  padding: '18px 28px 24px',
                  display: 'flex',
                  gap: 10,
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                }}>
                  {[
                    {
                      label: 'GitHub',
                      href: 'https://github.com/ScryLk',
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
                        </svg>
                      ),
                    },
                    {
                      label: 'LinkedIn',
                      href: 'https://www.linkedin.com/in/lucas-kepler/',
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                      ),
                    },
                    {
                      label: 'Email',
                      href: 'mailto:keplerlucas7@gmail.com',
                      icon: (
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z"/>
                          <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z"/>
                        </svg>
                      ),
                    },
                  ].map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target={link.href.startsWith('mailto') ? undefined : '_blank'}
                      rel={link.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                      style={{
                        fontFamily: 'var(--font-mono), monospace',
                        fontSize: 11,
                        padding: '8px 18px',
                        borderRadius: 6,
                        background: 'rgba(0,200,224,0.06)',
                        border: '0.5px solid rgba(0,200,224,0.25)',
                        color: '#00c8e0',
                        textDecoration: 'none',
                        transition: 'all 0.2s',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 8,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0,200,224,0.12)'
                        e.currentTarget.style.borderColor = 'rgba(0,200,224,0.5)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(0,200,224,0.06)'
                        e.currentTarget.style.borderColor = 'rgba(0,200,224,0.25)'
                      }}
                    >
                      {link.icon}
                      {link.label}
                    </a>
                  ))}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
