'use client'

import { useState, useEffect } from 'react'
import { api, ApiCharacter } from '@/lib/api'

export function useCharacters(timePeriodId: string | null) {
  const [characters, setCharacters] = useState<ApiCharacter[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!timePeriodId) {
      setCharacters([])
      return
    }

    const fetchCharacters = async () => {
      setLoading(true)
      setError(null)

      try {
        const data = await api.getCharacters(timePeriodId)
        setCharacters(data)
      } catch (err) {
        console.error('Failed to fetch characters:', err)
        setError('Failed to load characters')
        setCharacters([])
      } finally {
        setLoading(false)
      }
    }

    fetchCharacters()
  }, [timePeriodId])

  return { characters, loading, error }
}
