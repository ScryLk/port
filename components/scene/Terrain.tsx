'use client'
import { useMemo } from 'react'
import { PlaneGeometry } from 'three'
import { createNoise2D } from 'simplex-noise'

const noise2D = createNoise2D()

function buildHeightmap(geo: PlaneGeometry, scale = 0.06, amplitude = 14) {
  const pos = geo.attributes.position
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i)
    const z = pos.getY(i)
    const n =
      noise2D(x * scale, z * scale) * amplitude +
      noise2D(x * scale * 2.1, z * scale * 2.1) * amplitude * 0.4 +
      noise2D(x * scale * 0.4, z * scale * 0.4) * amplitude * 1.2
    pos.setZ(i, n)
  }
  pos.needsUpdate = true
  geo.computeVertexNormals()
}

export function Terrain() {
  const geo = useMemo(() => {
    const g = new PlaneGeometry(420, 320, 55, 40)
    buildHeightmap(g)
    return g
  }, [])

  return (
    <mesh
      geometry={geo}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, -4, -80]}
      receiveShadow
    >
      <meshStandardMaterial
        color="#061525"
        roughness={0.9}
        metalness={0.1}
        wireframe={false}
      />
    </mesh>
  )
}
