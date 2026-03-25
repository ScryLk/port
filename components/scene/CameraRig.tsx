'use client'
import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { CatmullRomCurve3, Vector3 } from 'three'
import { useScroll } from '@/components/providers/ScrollProvider'

const WAYPOINTS: [number[], number[]][] = [
  [[0, 18, 80],    [0, 5, 0]],
  [[-10, 10, 40],  [-5, 4, 0]],
  [[-20, 8, 0],    [-20, 5, -25]],
  [[-30, 8, -40],  [-30, 5, -65]],
  [[-15, 9, -80],  [-15, 5, -105]],
  [[0, 12, -120],  [0, 5, -140]],
  [[10, 15, -160], [10, 4, -180]],
]

const posCurve = new CatmullRomCurve3(WAYPOINTS.map(w => new Vector3(...(w[0] as [number, number, number]))))
const tgtCurve = new CatmullRomCurve3(WAYPOINTS.map(w => new Vector3(...(w[1] as [number, number, number]))))

const tmpPos = new Vector3()
const tmpTgt = new Vector3()

export function CameraRig() {
  const { camera } = useThree()
  const { progress } = useScroll()
  const current = useRef({ pos: new Vector3(0, 18, 80), tgt: new Vector3(0, 5, 0) })

  useFrame(() => {
    const t = Math.min(Math.max(progress.current, 0), 1)
    posCurve.getPoint(t, tmpPos)
    tgtCurve.getPoint(t, tmpTgt)
    current.current.pos.lerp(tmpPos, 0.06)
    current.current.tgt.lerp(tmpTgt, 0.06)
    camera.position.copy(current.current.pos)
    camera.lookAt(current.current.tgt)
  })

  return null
}
