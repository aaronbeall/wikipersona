'use client'

import { useState } from 'react'
import { api, ApiCharacter, ChatMessage } from '@/lib/api'

interface Message {
  id: string
  sender: 'user' | 'character'
  text: string
  timestamp: Date
}

export function useConversation() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentCharacter, setCurrentCharacter] = useState<ApiCharacter | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isSending, setIsSending] = useState(false)

  const startConversation = (character: ApiCharacter) => {
    setCurrentCharacter(character)
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'character',
        text: character.greetingMessage,
        timestamp: new Date(),
      },
    ])
    setIsOpen(true)
  }

  const endConversation = () => {
    setIsOpen(false)
    setCurrentCharacter(null)
    setMessages([])
  }

  const sendMessage = async (text: string) => {
    if (!currentCharacter || !text.trim() || isSending) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      sender: 'user',
      text: text.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsSending(true)

    try {
      // Convert messages to conversation history format
      const history: ChatMessage[] = messages.map((msg) => ({
        role: msg.sender === 'user' ? 'user' : 'assistant',
        content: msg.text,
      }))

      // Send to API
      const aiResponse = await api.sendChatMessage(currentCharacter.id, text.trim(), history)

      // Add AI response
      const characterMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'character',
        text: aiResponse,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, characterMessage])
    } catch (error) {
      console.error('Failed to send message:', error)

      // Add error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        sender: 'character',
        text: 'I seem to be at a loss for words. Please try again.',
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsSending(false)
    }
  }

  return {
    isOpen,
    currentCharacter,
    messages,
    isSending,
    startConversation,
    endConversation,
    sendMessage,
  }
}
