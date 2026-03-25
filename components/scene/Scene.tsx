'use client'
import { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import { Fog, Color } from 'three'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import { Terrain } from './Terrain'
import { CameraRig } from './CameraRig'
import { Stars } from './Stars'
import { GridFloor } from './GridFloor'
import { MonitorStation } from './stations/MonitorStation'
import { PROJECTS } from '@/data/projects'

export function Scene() {
  return (
    <Canvas
      style={{ position: 'fixed', inset: 0, zIndex: 0 }}
      camera={{ position: [0, 18, 80], fov: 60, near: 0.1, far: 600 }}
      gl={{ antialias: true }}
      onCreated={({ scene }) => {
        scene.background = new Color('#040d1a')
        scene.fog = new Fog('#040d1a', 80, 260)
      }}
    >
      <Suspense fallback={null}>
        <ambientLight intensity={0.12} />
        <directionalLight position={[10, 40, 20]} intensity={0.3} color="#cff7ff" />
        {/* Central spotlight — hero illumination */}
        <spotLight
          position={[0, 50, 60]}
          angle={0.35}
          penumbra={0.8}
          intensity={1.2}
          color="#00c8e0"
          distance={200}
          decay={1.5}
          castShadow={false}
        />
        <pointLight position={[0, 25, 70]} intensity={0.5} color="#00c8e0" distance={120} decay={2} />
        <pointLight position={[0, 15, 0]} intensity={0.15} color="#cff7ff" distance={100} decay={2} />

        <Stars />
        <GridFloor />
        <Terrain />
        <CameraRig />

        <MonitorStation
          position={[-20, 1, -10]}
          projects={[PROJECTS[0], PROJECTS[1]]}
        />
        <MonitorStation
          position={[-30, 1, -50]}
          projects={[PROJECTS[2], PROJECTS[3]]}
        />
        <MonitorStation
          position={[-15, 1, -90]}
          projects={[PROJECTS[4], PROJECTS[5]]}
        />

        <EffectComposer>
          <Bloom luminanceThreshold={0.15} luminanceSmoothing={0.9} intensity={0.8} />
          <Vignette eskil={false} offset={0.1} darkness={0.6} />
        </EffectComposer>
      </Suspense>
    </Canvas>
  )
}
