'use client'
import { MonitorScreen } from './MonitorScreen'
import type { ProjectData } from '@/data/projects'
import { PROJECTS } from '@/data/projects'

interface Props {
  position: [number, number, number]
  projects: [ProjectData, ProjectData]
}

function Monitor({ position, project }: { position: [number, number, number]; project: ProjectData }) {
  const projectIndex = PROJECTS.findIndex(p => p.name === project.name)

  return (
    <group position={position}>
      <mesh>
        <boxGeometry args={[3.6, 2.2, 0.12]} />
        <meshStandardMaterial color="#030e1c" metalness={0.7} roughness={0.3} />
      </mesh>
      <MonitorScreen position={[0, 0, 0.07]} project={project} projectIndex={projectIndex} />
      <mesh position={[0, -1.3, 0]}>
        <cylinderGeometry args={[0.06, 0.06, 0.8, 8]} />
        <meshStandardMaterial color="#071525" />
      </mesh>
      <mesh position={[0, -1.72, 0]}>
        <boxGeometry args={[1, 0.08, 0.5]} />
        <meshStandardMaterial color="#071525" />
      </mesh>
      <pointLight position={[0, 0, 0.5]} intensity={0.6} color="#00c8e0" distance={4} decay={2} />
    </group>
  )
}

export function MonitorStation({ position, projects }: Props) {
  return (
    <group position={position}>
      <mesh position={[0, -0.5, 0]}>
        <boxGeometry args={[9, 0.3, 3]} />
        <meshStandardMaterial color="#071828" metalness={0.6} roughness={0.4} />
      </mesh>
      <Monitor position={[-2.4, 1.2, 0]} project={projects[0]} />
      <Monitor position={[2.4, 1.2, 0]} project={projects[1]} />
    </group>
  )
}
