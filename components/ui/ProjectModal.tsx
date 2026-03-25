'use client'
import { useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useProjectModal } from '@/hooks/useProjectModal'
import { useScroll } from '@/components/providers/ScrollProvider'
import { PROJECTS } from '@/data/projects'
import { useI18n, getProjectDescriptionKey } from '@/lib/i18n'

export function ProjectModal() {
  const { isOpen, activeIndex, closeModal, navigate } = useProjectModal()
  const { resume } = useScroll()
  const { t } = useI18n()
  const project = PROJECTS[activeIndex]

  const handleClose = useCallback(() => {
    closeModal()
    resume()
  }, [closeModal, resume])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'Escape') handleClose()
      if (e.key === 'ArrowRight') navigate('next', PROJECTS.length)
      if (e.key === 'ArrowLeft') navigate('prev', PROJECTS.length)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen, handleClose, navigate])

  if (!project) return null

  const descKey = getProjectDescriptionKey(project.name)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={handleClose}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 100,
              background: 'rgba(2, 11, 22, 0.88)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
            }}
          />

          <div
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 101,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              pointerEvents: 'none',
            }}
          >
          <motion.div
            key={`modal-${activeIndex}`}
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.92 }}
            transition={{ duration: 0.28, ease: [0.34, 1.56, 0.64, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              width: 'min(640px, 92vw)',
              maxHeight: '90vh',
              overflowY: 'auto',
              background: '#040d1a',
              border: '0.5px solid rgba(0, 200, 224, 0.25)',
              borderRadius: 12,
              pointerEvents: 'auto',
            }}
          >
            {/* Tabs */}
            <div style={{
              padding: '10px 16px',
              borderBottom: '0.5px solid rgba(0,200,224,0.08)',
              display: 'flex',
              gap: 6,
              flexWrap: 'wrap',
            }}>
              {PROJECTS.map((p, i) => (
                <button
                  key={p.name}
                  onClick={() => {
                    const dir = i > activeIndex ? 'next' : 'prev'
                    const diff = Math.abs(i - activeIndex)
                    for (let d = 0; d < diff; d++) navigate(dir, PROJECTS.length)
                  }}
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 10,
                    padding: '4px 12px',
                    borderRadius: 4,
                    border: `0.5px solid rgba(0,200,224,${i === activeIndex ? '0.6' : '0.2'})`,
                    background: i === activeIndex ? 'rgba(0,200,224,0.06)' : 'transparent',
                    color: i === activeIndex ? '#00c8e0' : 'rgba(0,200,224,0.4)',
                    cursor: 'pointer',
                    transition: 'all 0.15s',
                  }}
                >
                  {p.name}
                </button>
              ))}
            </div>

            {/* Header */}
            <div style={{
              padding: '20px 24px 16px',
              borderBottom: '0.5px solid rgba(0,200,224,0.1)',
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              gap: 12,
            }}>
              <div>
                <p style={{
                  fontFamily: 'var(--font-mono), monospace',
                  fontSize: 10,
                  color: '#00c8e0',
                  letterSpacing: '0.3em',
                  marginBottom: 6,
                }}>
                  {`${t('modal.project')} // 0${activeIndex + 1}`}
                </p>
                <h2 style={{
                  fontSize: 22,
                  fontWeight: 500,
                  color: '#fff',
                  margin: 0,
                }}>
                  {project.name}
                </h2>
              </div>

              <button
                onClick={handleClose}
                aria-label={t('modal.close')}
                style={{
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
                  flexShrink: 0,
                }}
              >
                ✕
              </button>
            </div>

            {/* Body */}
            <div style={{ padding: '20px 24px' }}>
              <p style={{
                fontSize: 13,
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.7,
                marginBottom: 18,
              }}>
                {descKey ? t(descKey) : project.description}
              </p>

              <p style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 9,
                color: '#00c8e0',
                letterSpacing: '0.2em',
                marginBottom: 8,
              }}>
                {t('modal.stack')}
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 20 }}>
                {project.stack.map((s) => (
                  <span
                    key={s}
                    style={{
                      fontFamily: 'var(--font-mono), monospace',
                      fontSize: 10,
                      color: '#00c8e0',
                      border: '0.5px solid rgba(0,200,224,0.3)',
                      padding: '3px 10px',
                      borderRadius: 4,
                      background: 'rgba(0,200,224,0.04)',
                    }}
                  >
                    {s}
                  </span>
                ))}
              </div>

            </div>

            {/* Footer */}
            <div style={{
              padding: '14px 24px',
              borderTop: '0.5px solid rgba(0,200,224,0.1)',
              display: 'flex',
              gap: 10,
              alignItems: 'center',
            }}>
              {project.demo && (
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 11,
                    padding: '7px 16px',
                    borderRadius: 5,
                    background: 'rgba(0,200,224,0.1)',
                    border: '0.5px solid rgba(0,200,224,0.4)',
                    color: '#00c8e0',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 6,
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z"/>
                  </svg>
                  {t('modal.demo')}
                </a>
              )}

              {project.github && (
                <a
                  href={`https://${project.github}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 11,
                    padding: '7px 16px',
                    borderRadius: 5,
                    background: 'transparent',
                    border: '0.5px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.4)',
                    textDecoration: 'none',
                  }}
                >
                  GitHub
                </a>
              )}

              <div style={{ flex: 1 }} />

              <div style={{ display: 'flex', gap: 6 }}>
                <button
                  onClick={() => navigate('prev', PROJECTS.length)}
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 11,
                    padding: '6px 12px',
                    borderRadius: 5,
                    background: 'transparent',
                    border: '0.5px solid rgba(0,200,224,0.2)',
                    color: 'rgba(0,200,224,0.5)',
                    cursor: 'pointer',
                  }}
                >
                  ←
                </button>
                <button
                  onClick={() => navigate('next', PROJECTS.length)}
                  style={{
                    fontFamily: 'var(--font-mono), monospace',
                    fontSize: 11,
                    padding: '6px 12px',
                    borderRadius: 5,
                    background: 'transparent',
                    border: '0.5px solid rgba(0,200,224,0.2)',
                    color: 'rgba(0,200,224,0.5)',
                    cursor: 'pointer',
                  }}
                >
                  →
                </button>
              </div>

              <span style={{
                fontFamily: 'var(--font-mono), monospace',
                fontSize: 10,
                color: 'rgba(0,200,224,0.3)',
              }}>
                {activeIndex + 1} / {PROJECTS.length}
              </span>
            </div>
          </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
