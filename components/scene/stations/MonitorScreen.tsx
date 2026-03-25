'use client'
import { useRef, useState } from 'react'
import { RenderTexture, Text, PerspectiveCamera } from '@react-three/drei'
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

function ScreenContent({ project, hovered }: { project: ProjectData; hovered: boolean }) {
  return (
    <group>
      <Text
        position={[-1.4, 0.78, 0]}
        fontSize={0.2}
        color="#00c8e0"
        anchorX="left"
        font="/fonts/JetBrainsMono-Regular.ttf"
      >
        {`> ${project.name}`}
      </Text>

      {project.stack.slice(0, 3).map((s, i) => (
        <Text
          key={s}
          position={[-1.4 + i * 0.95, 0.42, 0]}
          fontSize={0.13}
          color={hovered ? '#00c8e0' : '#005f80'}
          anchorX="left"
          font="/fonts/JetBrainsMono-Regular.ttf"
        >
          {s}
        </Text>
      ))}

      {[
        '─────────────────',
        'const app = init()',
        'await deploy(prod)',
        '✓ running on :3000',
      ].map((line, i) => (
        <Text
          key={i}
          position={[-1.4, 0.1 - i * 0.26, 0]}
          fontSize={0.13}
          color={i === 3 ? '#4fffb0' : 'rgba(0,100,120,0.7)'}
          anchorX="left"
          font="/fonts/JetBrainsMono-Regular.ttf"
        >
          {line}
        </Text>
      ))}

      {hovered && (
        <Text
          position={[0, -0.78, 0]}
          fontSize={0.15}
          color="rgba(0,200,224,0.5)"
          anchorX="center"
          font="/fonts/JetBrainsMono-Regular.ttf"
        >
          click to open
        </Text>
      )}
    </group>
  )
}

export function MonitorScreen({ position, project, projectIndex }: Props) {
  const meshRef = useRef<Mesh>(null)
  const [hovered, setHovered] = useState(false)
  const { openModal } = useProjectModal()
  const { pause } = useScroll()

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
      <meshBasicMaterial>
        <RenderTexture attach="map" anisotropy={16}>
          <PerspectiveCamera makeDefault position={[0, 0, 5]} />
          <color attach="background" args={[hovered ? '#041520' : '#020c18']} />
          <ScreenContent project={project} hovered={hovered} />
        </RenderTexture>
      </meshBasicMaterial>
    </mesh>
  )
}
