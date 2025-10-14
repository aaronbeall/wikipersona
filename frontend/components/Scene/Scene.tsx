'use client'

import { useState } from 'react'
import { Canvas } from '@react-three/fiber'
import Environment from './Environment'
import Lighting from './Lighting'
import Camera from './Camera'
import Avatar from './Avatar'
import Character from './Character'
import { useCharacters } from '@/hooks/useCharacters'
import { useKeyboard } from '@/hooks/useKeyboard'
import { ApiCharacter } from '@/lib/api'

interface SceneProps {
  timePeriodId: string
  environmentData: {
    skyColor: string
    groundColor: string
    ambientLight: string
    directionalLight: string
  }
  onCharacterInteract: (character: ApiCharacter) => void
}

export default function Scene({ timePeriodId, environmentData, onCharacterInteract }: SceneProps) {
  const [avatarPosition, setAvatarPosition] = useState<[number, number, number]>([0, 0.5, 0])
  const { characters, loading } = useCharacters(timePeriodId)
  const keys = useKeyboard()

  const handleAvatarMove = (x: number, y: number, z: number) => {
    setAvatarPosition([x, y, z])
  }

  return (
    <Canvas
      shadows
      camera={{ position: [0, 15, 10], fov: 50 }}
      style={{ width: '100vw', height: '100vh' }}
    >
      {/* Lighting */}
      <Lighting
        ambientColor={environmentData.ambientLight}
        directionalColor={environmentData.directionalLight}
      />

      {/* Environment */}
      <Environment groundColor={environmentData.groundColor} skyColor={environmentData.skyColor} />

      {/* Avatar */}
      <Avatar onPositionChange={handleAvatarMove} />

      {/* Camera following avatar */}
      <Camera targetPosition={avatarPosition} />

      {/* Characters */}
      {!loading &&
        characters.map((character) => (
          <Character
            key={character.id}
            character={character}
            avatarPosition={avatarPosition}
            onInteract={onCharacterInteract}
            interactKey={keys.interact}
          />
        ))}
    </Canvas>
  )
}
