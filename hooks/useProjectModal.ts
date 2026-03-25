import { create } from 'zustand'
import { ProjectData } from '@/data/projects'

interface ModalStore {
  isOpen: boolean
  project: ProjectData | null
  activeIndex: number
  openModal: (project: ProjectData, index: number) => void
  closeModal: () => void
  navigate: (direction: 'prev' | 'next', total: number) => void
}

export const useProjectModal = create<ModalStore>((set, get) => ({
  isOpen: false,
  project: null,
  activeIndex: 0,

  openModal: (project, index) => set({
    isOpen: true,
    project,
    activeIndex: index,
  }),

  closeModal: () => set({
    isOpen: false,
    project: null,
  }),

  navigate: (direction, total) => {
    const current = get().activeIndex
    const next = direction === 'next'
      ? (current + 1) % total
      : (current - 1 + total) % total
    set({ activeIndex: next })
  },
}))
