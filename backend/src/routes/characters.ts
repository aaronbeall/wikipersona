import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// GET /api/characters?timePeriodId={id}
router.get('/', async (req: Request, res: Response) => {
  try {
    const { timePeriodId } = req.query

    if (!timePeriodId || typeof timePeriodId !== 'string') {
      return res.status(400).json({ error: 'timePeriodId is required' })
    }

    const characters = await prisma.character.findMany({
      where: {
        timePeriodId,
      },
      select: {
        id: true,
        name: true,
        role: true,
        positionX: true,
        positionY: true,
        positionZ: true,
        modelType: true,
        greetingMessage: true,
        wikipediaPageTitle: true,
        birthYear: true,
        deathYear: true,
      },
      orderBy: {
        name: 'asc',
      },
    })

    res.json({ characters })
  } catch (error) {
    console.error('[Characters] Error fetching characters:', error)
    res.status(500).json({ error: 'Failed to fetch characters' })
  }
})

export default router
