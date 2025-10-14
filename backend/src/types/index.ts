// Backend types for WikiPersona

export interface WikipediaSummary {
  title: string
  summary: string
  thumbnail?: string
}

export interface ChatRequest {
  characterId: string
  userMessage: string
  conversationHistory: ConversationMessage[]
}

export interface ConversationMessage {
  role: 'user' | 'assistant'
  content: string
}

export interface ChatResponse {
  message: string
  error?: string
}

export interface CacheItem<T> {
  value: T
  expiresAt: number
}
