// Core types for WikiPersona frontend

export interface Location {
  id: string
  name: string
  description: string
  slug: string
  createdAt: string
  updatedAt: string
}

export interface TimePeriod {
  id: string
  locationId: string
  name: string
  eraSlug: string
  yearStart: number
  yearEnd: number
  description: string
  environmentData: EnvironmentData
  createdAt: string
  updatedAt: string
}

export interface EnvironmentData {
  skyColor: string
  groundColor: string
  ambientLight: string
  directionalLight: string
  fogColor?: string
  fogDensity?: number
}

export interface Character {
  id: string
  timePeriodId: string
  name: string
  wikipediaPageTitle: string
  birthYear: number
  deathYear: number
  role: string
  positionX: number
  positionY: number
  positionZ: number
  modelType: string
  fallbackDescription: string
  greetingMessage: string
  createdAt: string
  updatedAt: string
}

export interface Building {
  id: string
  timePeriodId: string
  name: string
  type: string
  positionX: number
  positionY: number
  positionZ: number
  rotationY: number
  scale: number
  modelType: string
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  sender: 'user' | 'character'
  text: string
  timestamp: Date
}

export interface ConversationState {
  isOpen: boolean
  currentCharacter: Character | null
  messages: Message[]
}

export interface ChatRequest {
  characterId: string
  userMessage: string
  conversationHistory: { role: 'user' | 'assistant'; content: string }[]
}

export interface ChatResponse {
  message: string
  error?: string
}
