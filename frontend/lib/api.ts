const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001'

export interface ApiTimePeriod {
  id: string
  name: string
  eraSlug: string
  yearStart: number
  yearEnd: number
  description: string
  environmentData: {
    skyColor: string
    groundColor: string
    ambientLight: string
    directionalLight: string
  }
}

export interface ApiCharacter {
  id: string
  name: string
  role: string
  positionX: number
  positionY: number
  positionZ: number
  modelType: string
  greetingMessage: string
  wikipediaPageTitle: string
  birthYear: number
  deathYear: number
}

export interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

export const api = {
  async getTimePeriods(locationId: string): Promise<ApiTimePeriod[]> {
    const response = await fetch(`${API_URL}/api/time-periods?locationId=${locationId}`)

    if (!response.ok) {
      throw new Error('Failed to fetch time periods')
    }

    const data = await response.json()
    return data.timePeriods
  },

  async getCharacters(timePeriodId: string): Promise<ApiCharacter[]> {
    const response = await fetch(`${API_URL}/api/characters?timePeriodId=${timePeriodId}`)

    if (!response.ok) {
      throw new Error('Failed to fetch characters')
    }

    const data = await response.json()
    return data.characters
  },

  async sendChatMessage(
    characterId: string,
    userMessage: string,
    conversationHistory: ChatMessage[]
  ): Promise<string> {
    const response = await fetch(`${API_URL}/api/chat/send`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        characterId,
        userMessage,
        conversationHistory,
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to send message')
    }

    const data = await response.json()
    return data.message
  },
}
