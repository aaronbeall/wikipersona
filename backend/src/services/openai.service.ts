import OpenAI from 'openai'
import { ConversationMessage } from '../types'

export class OpenAIService {
  private client: OpenAI

  constructor() {
    const apiKey = process.env.OPENAI_API_KEY

    if (!apiKey || apiKey === 'sk-placeholder-replace-with-your-key') {
      console.warn('[OpenAI] No API key configured. AI responses will be mocked.')
      this.client = null as any
    } else {
      this.client = new OpenAI({ apiKey })
    }
  }

  async generateCharacterResponse(
    systemPrompt: string,
    conversationHistory: ConversationMessage[],
    userMessage: string
  ): Promise<string> {
    // Mock response if no API key
    if (!this.client) {
      return this.getMockResponse(userMessage)
    }

    try {
      const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
        { role: 'system', content: systemPrompt },
        ...conversationHistory.map((msg) => ({
          role: msg.role as 'user' | 'assistant',
          content: msg.content,
        })),
        { role: 'user', content: userMessage },
      ]

      const response = await this.client.chat.completions.create({
        model: 'gpt-4',
        messages,
        temperature: 0.7,
        max_tokens: 200,
      })

      const aiMessage = response.choices[0]?.message?.content

      if (!aiMessage) {
        throw new Error('No response from OpenAI')
      }

      return aiMessage
    } catch (error) {
      console.error('[OpenAI] Error generating response:', error)
      throw new Error('Failed to generate AI response')
    }
  }

  private getMockResponse(userMessage: string): string {
    const responses = [
      "Greetings, traveler. I am honored to speak with you. What would you like to know?",
      "That is a fascinating question. In my time, we pondered such matters deeply.",
      "Indeed, history teaches us many lessons. Let me share my perspective on this.",
      "Your curiosity reminds me of the great thinkers I have known. Allow me to elaborate.",
      "This was a significant matter in my era. I shall explain what I witnessed.",
    ]

    return responses[Math.floor(Math.random() * responses.length)]
  }
}

export const openaiService = new OpenAIService()
