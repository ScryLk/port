'use client'
import { useRef, useState, useMemo, useEffect } from 'react'
import * as THREE from 'three'
import type { Mesh } from 'three'
import type { ThreeEvent } from '@react-three/fiber'
import { useProjectModal } from '@/hooks/useProjectModal'
import { useScroll } from '@/components/providers/ScrollProvider'
import type { ProjectData } from '@/data/projects'

interface Props {
  position: [number, number, number]
  project: ProjectData
  projectIndex: number
}

function useScreenTexture(project: ProjectData, hovered: boolean) {
  return useMemo(() => {
    const canvas = document.createElement('canvas')
    canvas.width = 512
    canvas.height = 300

    const ctx = canvas.getContext('2d')!

    // Background
    ctx.fillStyle = hovered ? '#041520' : '#020c18'
    ctx.fillRect(0, 0, 512, 300)

    // Project name
    ctx.fillStyle = '#00c8e0'
    ctx.font = '500 18px "JetBrains Mono", monospace'
    ctx.fillText(`> ${project.name}`, 24, 56)

    // Stack tags
    ctx.font = '13px "JetBrains Mono", monospace'
    ctx.fillStyle = hovered ? '#00c8e0' : '#005f80'
    project.stack.slice(0, 3).forEach((s, i) => {
      ctx.fillText(s, 24 + i * 162, 100)
    })

    // Separator line
    ctx.fillStyle = 'rgba(0,100,120,0.7)'
    ctx.font = '13px "JetBrains Mono", monospace'
    ctx.fillText('─────────────────────', 24, 136)

    // Code lines
    const lines = [
      { text: 'const app = init()', color: 'rgba(0,100,120,0.7)' },
      { text: 'await deploy(prod)',  color: 'rgba(0,100,120,0.7)' },
      { text: '✓ running on :3000', color: '#4fffb0' },
    ]
    lines.forEach(({ text, color }, i) => {
      ctx.fillStyle = color
      ctx.fillText(text, 24, 168 + i * 28)
    })

    // Hover hint
    if (hovered) {
      ctx.fillStyle = 'rgba(0,200,224,0.5)'
      ctx.font = '14px "JetBrains Mono", monospace'
      ctx.textAlign = 'center'
      ctx.fillText('click to open', 256, 276)
      ctx.textAlign = 'left'
    }

    const texture = new THREE.CanvasTexture(canvas)
    texture.needsUpdate = true
    return texture
  }, [project, hovered])
}

export function MonitorScreen({ position, project, projectIndex }: Props) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const { openModal } = useProjectModal()
  const { pause } = useScroll()
  const texture = useScreenTexture(project, hovered)

  // Dispose texture on unmount or when it changes
  useEffect(() => {
    return () => {
      texture.dispose()
    }
  }, [texture])

  const handleClick = (e: ThreeEvent<MouseEvent>) => {
    e.stopPropagation()
    openModal(project, projectIndex)
    pause()
  }

  const handlePointerOver = () => {
    setHovered(true)
    document.body.style.cursor = 'pointer'
  }

  const handlePointerOut = () => {
    setHovered(false)
    document.body.style.cursor = 'none'
  }

  return (
    <mesh
      ref={meshRef}
      position={position}
      onClick={handleClick}
      onPointerOver={handlePointerOver}
      onPointerOut={handlePointerOut}
    >
      <planeGeometry args={[3.4, 2.0]} />
      <meshBasicMaterial map={texture} />
    </mesh>
  )
}
