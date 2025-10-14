'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { ApiTimePeriod } from '@/lib/api'

interface GameContextType {
  currentTimePeriod: ApiTimePeriod | null
  setCurrentTimePeriod: (period: ApiTimePeriod) => void
  locationId: string
  isLoading: boolean
  setIsLoading: (loading: boolean) => void
}

const GameContext = createContext<GameContextType | undefined>(undefined)

export function GameProvider({ children }: { children: ReactNode }) {
  // Default location is Athens (will be set from actual location ID after fetching)
  const [locationId] = useState<string>('ancient-athens')
  const [currentTimePeriod, setCurrentTimePeriod] = useState<ApiTimePeriod | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  return (
    <GameContext.Provider
      value={{
        currentTimePeriod,
        setCurrentTimePeriod,
        locationId,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </GameContext.Provider>
  )
}

export function useGame() {
  const context = useContext(GameContext)
  if (context === undefined) {
    throw new Error('useGame must be used within a GameProvider')
  }
  return context
}
