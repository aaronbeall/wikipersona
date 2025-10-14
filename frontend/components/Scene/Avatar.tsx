'use client'

import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Mesh, Vector3 } from 'three'
import { useKeyboard } from '@/hooks/useKeyboard'
import { clampPosition } from '@/lib/collision'

interface AvatarProps {
  onPositionChange: (x: number, y: number, z: number) => void
}

export default function Avatar({ onPositionChange }: AvatarProps) {
  const meshRef = useRef<Mesh>(null!)
  const keys = useKeyboard()
  const speed = 0.1
  const position = useRef(new Vector3(0, 0.5, 0))

  // Boundary limits
  const bounds = {
    minX: -40,
    maxX: 40,
    minZ: -40,
    maxZ: 40,
  }

  useFrame(() => {
    if (!meshRef.current) return

    let moved = false
    const moveVector = new Vector3()

    // Calculate movement based on keys
    if (keys.forward) {
      moveVector.z -= speed
      moved = true
    }
    if (keys.backward) {
      moveVector.z += speed
      moved = true
    }
    if (keys.left) {
      moveVector.x -= speed
      moved = true
    }
    if (keys.right) {
      moveVector.x += speed
      moved = true
    }

    if (moved) {
      // Normalize diagonal movement
      if (moveVector.length() > 0) {
        moveVector.normalize().multiplyScalar(speed)
      }

      // Update position
      const newX = position.current.x + moveVector.x
      const newZ = position.current.z + moveVector.z

      // Clamp to boundaries
      const clamped = clampPosition(newX, newZ, bounds.minX, bounds.maxX, bounds.minZ, bounds.maxZ)

      position.current.x = clamped.x
      position.current.z = clamped.z

      // Update mesh position
      meshRef.current.position.set(position.current.x, position.current.y, position.current.z)

      // Notify parent of position change
      onPositionChange(position.current.x, position.current.y, position.current.z)

      // Rotate avatar to face movement direction
      if (moveVector.length() > 0) {
        const angle = Math.atan2(moveVector.x, moveVector.z)
        meshRef.current.rotation.y = angle
      }
    }
  })

  useEffect(() => {
    // Initial position notification
    onPositionChange(position.current.x, position.current.y, position.current.z)
  }, [onPositionChange])

  return (
    <mesh ref={meshRef} position={[0, 0.5, 0]} castShadow>
      {/* Simple capsule-like avatar (box for now, will be replaced with model) */}
      <boxGeometry args={[0.6, 1.2, 0.6]} />
      <meshStandardMaterial color="#4a90e2" flatShading />
    </mesh>
  )
}
