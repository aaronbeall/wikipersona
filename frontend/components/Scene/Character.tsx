'use client'

import { useRef, useMemo } from 'react'
import { Mesh } from 'three'
import { Html } from '@react-three/drei'
import { ApiCharacter } from '@/lib/api'
import { isWithinRadius } from '@/lib/collision'

interface CharacterProps {
  character: ApiCharacter
  avatarPosition: [number, number, number]
  onInteract: (character: ApiCharacter) => void
  interactKey: boolean
}

export default function Character({
  character,
  avatarPosition,
  onInteract,
  interactKey,
}: CharacterProps) {
  const meshRef = useRef<Mesh>(null!)

  const interactionRadius = 3
  const isNearby = useMemo(() => {
    return isWithinRadius(
      avatarPosition[0],
      avatarPosition[2],
      character.positionX,
      character.positionZ,
      interactionRadius
    )
  }, [avatarPosition, character.positionX, character.positionZ, interactionRadius])

  // Handle interaction when E key is pressed and character is nearby
  const previousInteractKey = useRef(false)

  if (interactKey && !previousInteractKey.current && isNearby) {
    onInteract(character)
  }
  previousInteractKey.current = interactKey

  return (
    <group position={[character.positionX, character.positionY, character.positionZ]}>
      {/* Character mesh */}
      <mesh ref={meshRef} position={[0, 0.6, 0]} castShadow>
        <boxGeometry args={[0.6, 1.2, 0.6]} />
        <meshStandardMaterial
          color={isNearby ? '#ff6b6b' : '#50c878'}
          emissive={isNearby ? '#ff6b6b' : '#000000'}
          emissiveIntensity={isNearby ? 0.3 : 0}
          flatShading
        />
      </mesh>

      {/* Name label */}
      <Html position={[0, 2, 0]} center distanceFactor={10}>
        <div
          style={{
            background: 'rgba(0, 0, 0, 0.7)',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '4px',
            fontSize: '14px',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          {character.name}
        </div>
      </Html>
    </group>
  )
}
