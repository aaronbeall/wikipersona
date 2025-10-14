'use client'

interface LightingProps {
  ambientColor?: string
  directionalColor?: string
}

export default function Lighting({
  ambientColor = '#ffffff',
  directionalColor = '#fff8dc',
}: LightingProps) {
  return (
    <>
      <ambientLight intensity={0.6} color={ambientColor} />
      <directionalLight
        position={[10, 20, 10]}
        intensity={1.2}
        color={directionalColor}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
      />
      <directionalLight position={[-10, 10, -10]} intensity={0.4} color={directionalColor} />
    </>
  )
}
