'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { Vector3 } from 'three'

interface CameraProps {
  targetPosition: [number, number, number]
}

export default function Camera({ targetPosition }: CameraProps) {
  const { camera } = useThree()
  const targetRef = useRef(new Vector3(...targetPosition))

  useFrame(() => {
    // Update target position
    targetRef.current.set(targetPosition[0], targetPosition[1], targetPosition[2])

    // Camera position: above and behind the target
    const offset = new Vector3(0, 15, 10) // height=15, distance=10
    const desiredPosition = targetRef.current.clone().add(offset)

    // Smooth lerp to desired position
    camera.position.lerp(desiredPosition, 0.1)

    // Look at the target
    camera.lookAt(targetRef.current)
  })

  return null
}
