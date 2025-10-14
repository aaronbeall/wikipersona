import { Router, Request, Response } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// GET /api/time-periods?locationId={id}
router.get('/', async (req: Request, res: Response) => {
  try {
    const { locationId } = req.query

    if (!locationId || typeof locationId !== 'string') {
      return res.status(400).json({ error: 'locationId is required' })
    }

    const timePeriods = await prisma.timePeriod.findMany({
      where: {
        locationId,
      },
      select: {
        id: true,
        name: true,
        eraSlug: true,
        yearStart: true,
        yearEnd: true,
        description: true,
        environmentData: true,
      },
      orderBy: {
        yearStart: 'asc',
      },
    })

    res.json({ timePeriods })
  } catch (error) {
    console.error('[TimePeriods] Error fetching time periods:', error)
    res.status(500).json({ error: 'Failed to fetch time periods' })
  }
})

export default router
