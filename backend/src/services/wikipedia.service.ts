import { cacheService } from './cache.service'
import { WikipediaSummary } from '../types'

const WIKIPEDIA_API_BASE = 'https://en.wikipedia.org/api/rest_v1'
const CACHE_TTL_SECONDS = 7 * 24 * 60 * 60 // 7 days

export class WikipediaService {
  async getCharacterSummary(pageTitle: string): Promise<WikipediaSummary> {
    // Check cache first
    const cacheKey = `wikipedia:summary:${pageTitle}`
    const cached = cacheService.get<WikipediaSummary>(cacheKey)

    if (cached) {
      console.log(`[Wikipedia] Cache hit for ${pageTitle}`)
      return cached
    }

    // Fetch from Wikipedia API
    try {
      console.log(`[Wikipedia] Fetching ${pageTitle} from API`)
      const url = `${WIKIPEDIA_API_BASE}/page/summary/${encodeURIComponent(pageTitle)}`

      const response = await fetch(url, {
        headers: {
          'User-Agent': 'WikiPersona/1.0 (Educational Project)',
        },
      })

      if (!response.ok) {
        throw new Error(`Wikipedia API returned ${response.status}`)
      }

      const data = await response.json()

      const summary: WikipediaSummary = {
        title: data.title,
        summary: data.extract || '',
        thumbnail: data.thumbnail?.source,
      }

      // Cache the result
      cacheService.set(cacheKey, summary, CACHE_TTL_SECONDS)

      return summary
    } catch (error) {
      console.error(`[Wikipedia] Error fetching ${pageTitle}:`, error)

      // Return minimal fallback
      return {
        title: pageTitle,
        summary: `A historical figure from the era. Unfortunately, detailed information is temporarily unavailable.`,
      }
    }
  }
}

export const wikipediaService = new WikipediaService()
