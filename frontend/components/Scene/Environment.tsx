'use client'

import { useRef } from 'react'
import { Mesh } from 'three'

interface EnvironmentProps {
  groundColor?: string
  skyColor?: string
}

export default function Environment({
  groundColor = '#D2B48C',
  skyColor = '#87CEEB',
}: EnvironmentProps) {
  const groundRef = useRef<Mesh>(null!)

  return (
    <>
      {/* Sky color */}
      <color attach="background" args={[skyColor]} />

      {/* Ground plane */}
      <mesh
        ref={groundRef}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0, 0]}
        receiveShadow
      >
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={groundColor} flatShading />
      </mesh>

      {/* Placeholder buildings - simple boxes for now */}
      <mesh position={[10, 2, 10]} castShadow>
        <boxGeometry args={[4, 4, 4]} />
        <meshStandardMaterial color="#f0e68c" flatShading />
      </mesh>

      <mesh position={[-12, 3, 8]} castShadow>
        <boxGeometry args={[6, 6, 3]} />
        <meshStandardMaterial color="#deb887" flatShading />
      </mesh>

      <mesh position={[15, 2.5, -10]} castShadow>
        <boxGeometry args={[5, 5, 5]} />
        <meshStandardMaterial color="#f5deb3" flatShading />
      </mesh>
    </>
  )
}
