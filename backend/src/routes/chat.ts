import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'
import { wikipediaService } from '../services/wikipedia.service'
import { openaiService } from '../services/openai.service'
import { ChatRequest, ChatResponse } from '../types'

const router = Router()
const prisma = new PrismaClient()

// POST /api/chat/send
router.post('/send', async (req: Request, res: Response) => {
  try {
    const { characterId, userMessage, conversationHistory }: ChatRequest = req.body

    // Validation
    if (!characterId || !userMessage) {
      return res.status(400).json({ error: 'characterId and userMessage are required' })
    }

    // Get character from database
    const character = await prisma.character.findUnique({
      where: { id: characterId },
      include: {
        timePeriod: {
          select: {
            name: true,
            yearStart: true,
            yearEnd: true,
          },
        },
      },
    })

    if (!character) {
      return res.status(404).json({ error: 'Character not found' })
    }

    // Fetch Wikipedia summary
    const wikipediaSummary = await wikipediaService.getCharacterSummary(
      character.wikipediaPageTitle
    )

    // Construct system prompt
    const systemPrompt = `You are ${character.name}, a historical figure from ${character.timePeriod.name}.

Background: ${wikipediaSummary.summary}

Key facts:
- Born: ${character.birthYear}
- Died: ${character.deathYear}
- Role: ${character.role}
- Time Period: ${character.timePeriod.name} (${character.timePeriod.yearStart} - ${character.timePeriod.yearEnd})

Instructions:
- Respond in first person as this character
- Use language and knowledge appropriate to your time period
- Be educational but conversational
- If asked about events after your time, explain you don't know the future
- Keep responses concise (2-4 sentences typically)
- Show personality and emotion
- Reference your actual historical work and life experiences
- Speak as if you are actually living in your time period, not from modern perspective`

    // Generate AI response
    const aiResponse = await openaiService.generateCharacterResponse(
      systemPrompt,
      conversationHistory || [],
      userMessage
    )

    // Optional: Log conversation for analytics
    try {
      await prisma.conversationLog.create({
        data: {
          characterId,
          userMessage,
          aiResponse,
        },
      })
    } catch (logError) {
      console.error('[Chat] Failed to log conversation:', logError)
      // Don't fail the request if logging fails
    }

    const response: ChatResponse = {
      message: aiResponse,
    }

    res.json(response)
  } catch (error) {
    console.error('[Chat] Error processing chat:', error)

    const response: ChatResponse = {
      message: 'I seem to be at a loss for words. Please try again.',
      error: 'Failed to generate response',
    }

    res.status(500).json(response)
  }
})

export default router
