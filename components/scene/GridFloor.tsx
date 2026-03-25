'use client'
import { Grid } from '@react-three/drei'

export function GridFloor() {
  return (
    <Grid
      position={[0, -3.9, -80]}
      args={[420, 320]}
      cellSize={4}
      cellThickness={0.6}
      cellColor="#005f80"
      sectionSize={20}
      sectionThickness={1}
      sectionColor="#00c8e0"
      fadeDistance={200}
      fadeStrength={1.5}
      infiniteGrid={false}
      followCamera={false}
    />
  )
}
