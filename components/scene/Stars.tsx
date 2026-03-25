'use client'
import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Points, PointMaterial } from '@react-three/drei'
import * as THREE from 'three'

export function Stars() {
  const ref = useRef<THREE.Points>(null)

  const positions = useMemo(() => {
    const count = 3000
    const arr = new Float32Array(count * 3)
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 500
      arr[i * 3 + 1] = Math.random() * 200 + 20
      arr[i * 3 + 2] = (Math.random() - 0.5) * 500
    }
    return arr
  }, [])

  useFrame((_, delta) => {
    if (ref.current) {
      ref.current.rotation.y += delta * 0.005
    }
  })

  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#cff7ff"
        size={0.4}
        sizeAttenuation
        depthWrite={false}
        opacity={0.6}
      />
    </Points>
  )
}
