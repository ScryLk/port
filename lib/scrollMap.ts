export const SECTIONS = [
  { id: 'hero',    start: 0,    end: 0.15 },
  { id: 'about',   start: 0.15, end: 0.30 },
  { id: 'work-a',  start: 0.30, end: 0.45 },
  { id: 'work-b',  start: 0.45, end: 0.60 },
  { id: 'work-c',  start: 0.60, end: 0.72 },
  { id: 'stack',   start: 0.72, end: 0.86 },
  { id: 'contact', start: 0.86, end: 1.00 },
]

export function getActiveSection(progress: number) {
  return SECTIONS.find(s => progress >= s.start && progress < s.end)?.id ?? 'contact'
}

export function getSectionProgress(progress: number, sectionId: string) {
  const s = SECTIONS.find(sec => sec.id === sectionId)
  if (!s) return 0
  return Math.min(Math.max((progress - s.start) / (s.end - s.start), 0), 1)
}
