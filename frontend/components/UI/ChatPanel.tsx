'use client'

import { useState, useRef, useEffect } from 'react'
import { ApiCharacter } from '@/lib/api'

interface Message {
  id: string
  sender: 'user' | 'character'
  text: string
  timestamp: Date
}

interface ChatPanelProps {
  isOpen: boolean
  character: ApiCharacter | null
  messages: Message[]
  isSending: boolean
  onSendMessage: (text: string) => void
  onClose: () => void
}

export default function ChatPanel({
  isOpen,
  character,
  messages,
  isSending,
  onSendMessage,
  onClose,
}: ChatPanelProps) {
  const [input, setInput] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isSending) {
      onSendMessage(input)
      setInput('')
    }
  }

  if (!isOpen || !character) return null

  return (
    <div
      className="fixed right-0 top-0 h-full w-96 bg-white shadow-2xl flex flex-col z-50 animate-slide-in"
      style={{
        animation: 'slideIn 0.3s ease-out',
      }}
    >
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex items-center justify-between">
        <div className="flex-1">
          <h2 className="text-lg font-bold">{character.name}</h2>
          <p className="text-sm opacity-90">{character.role}</p>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:bg-blue-700 rounded p-2 transition-colors"
          aria-label="Close chat"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-800'
              }`}
            >
              <p className="text-sm font-semibold mb-1">
                {message.sender === 'user' ? 'You' : character.name}
              </p>
              <p className="text-sm">{message.text}</p>
            </div>
          </div>
        ))}

        {isSending && (
          <div className="flex justify-start">
            <div className="bg-gray-200 text-gray-800 p-3 rounded-lg">
              <p className="text-sm">Typing...</p>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 bg-white border-t">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isSending}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
          />
          <button
            type="submit"
            disabled={isSending || !input.trim()}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
      </form>

      <style jsx>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  )
}
