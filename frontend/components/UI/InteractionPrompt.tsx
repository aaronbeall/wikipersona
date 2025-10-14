'use client'

import { ApiCharacter } from '@/lib/api'

interface InteractionPromptProps {
  character: ApiCharacter | null
}

export default function InteractionPrompt({ character }: InteractionPromptProps) {
  if (!character) return null

  return (
    <div className="fixed bottom-24 left-1/2 transform -translate-x-1/2 z-40">
      <div className="bg-black bg-opacity-80 text-white px-6 py-3 rounded-lg shadow-lg">
        <p className="text-center">
          Press <span className="font-bold text-yellow-300">E</span> to talk to{' '}
          <span className="font-bold">{character.name}</span>
        </p>
      </div>
    </div>
  )
}
