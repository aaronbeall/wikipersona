'use client'

import { useState, useEffect, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { api, ApiTimePeriod, ApiCharacter } from '@/lib/api'
import { useConversation } from '@/hooks/useConversation'
import ChatPanel from '@/components/UI/ChatPanel'
import InteractionPrompt from '@/components/UI/InteractionPrompt'
import TimeWheel from '@/components/UI/TimeWheel'
import LoadingScreen from '@/components/UI/LoadingScreen'
import { isWithinRadius } from '@/lib/collision'
import { useCharacters } from '@/hooks/useCharacters'

// Dynamically import Scene to avoid SSR issues with Three.js
const Scene = dynamic(() => import('@/components/Scene/Scene'), {
  ssr: false,
  loading: () => <div className="w-screen h-screen bg-gray-900 flex items-center justify-center">
    <p className="text-white text-xl">Loading 3D scene...</p>
  </div>
})

export default function ExplorePage() {
  // Athens location ID (hardcoded for MVP)
  const athensLocationId = 'ancient-athens' // This will be fetched from API in future

  const [timePeriods, setTimePeriods] = useState<ApiTimePeriod[]>([])
  const [currentTimePeriod, setCurrentTimePeriod] = useState<ApiTimePeriod | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [avatarPosition, setAvatarPosition] = useState<[number, number, number]>([0, 0.5, 0])

  const conversation = useConversation()
  const { characters } = useCharacters(currentTimePeriod?.id || null)

  // Find nearby character for interaction prompt
  const nearbyCharacter = useMemo(() => {
    return characters.find((char) =>
      isWithinRadius(avatarPosition[0], avatarPosition[2], char.positionX, char.positionZ, 3)
    ) || null
  }, [characters, avatarPosition])

  // Load time periods on mount
  useEffect(() => {
    const loadTimePeriods = async () => {
      try {
        setIsLoading(true)

        // Since we're using fixed IDs in seed, we'll fetch using the Athens ID directly
        // In a real app, we'd fetch location first, then time periods
        const periods = await api.getTimePeriods(athensLocationId)

        if (periods.length > 0) {
          setTimePeriods(periods)
          setCurrentTimePeriod(periods[0])
        }
      } catch (error) {
        console.error('Failed to load time periods:', error)
      } finally {
        setIsLoading(false)
      }
    }

    loadTimePeriods()
  }, [athensLocationId])

  const handleTimePeriodChange = async (period: ApiTimePeriod) => {
    if (period.id === currentTimePeriod?.id) return

    // Close chat if open
    if (conversation.isOpen) {
      conversation.endConversation()
    }

    // Trigger transition
    setIsTransitioning(true)

    // Simulate loading time
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setCurrentTimePeriod(period)
    setIsTransitioning(false)
  }

  const handleCharacterInteract = (character: ApiCharacter) => {
    conversation.startConversation(character)
  }

  if (isLoading || !currentTimePeriod) {
    return <LoadingScreen isVisible={true} message="Loading Athens..." />
  }

  return (
    <div className="w-screen h-screen overflow-hidden relative">
      {/* 3D Scene */}
      <Scene
        timePeriodId={currentTimePeriod.id}
        environmentData={currentTimePeriod.environmentData as any}
        onCharacterInteract={handleCharacterInteract}
      />

      {/* UI Overlays */}
      {!conversation.isOpen && nearbyCharacter && (
        <InteractionPrompt character={nearbyCharacter} />
      )}

      <TimeWheel
        timePeriods={timePeriods}
        currentTimePeriod={currentTimePeriod}
        onTimePeriodChange={handleTimePeriodChange}
      />

      <ChatPanel
        isOpen={conversation.isOpen}
        character={conversation.currentCharacter}
        messages={conversation.messages}
        isSending={conversation.isSending}
        onSendMessage={conversation.sendMessage}
        onClose={conversation.endConversation}
      />

      {/* Time period transition loading */}
      <LoadingScreen
        isVisible={isTransitioning}
        message={`Traveling to ${currentTimePeriod.name}...`}
      />

      {/* Controls hint */}
      <div className="fixed bottom-8 left-8 bg-black bg-opacity-70 text-white px-4 py-3 rounded-lg text-sm z-30">
        <p className="font-bold mb-1">Controls:</p>
        <p>WASD - Move around</p>
        <p>E - Talk to characters</p>
      </div>
    </div>
  )
}
