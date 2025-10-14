import express, { Application } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { errorHandler, notFoundHandler } from './middleware/errorHandler'
import charactersRouter from './routes/characters'
import timePeriodsRouter from './routes/timePeriods'
import chatRouter from './routes/chat'

// Load environment variables
dotenv.config()

const app: Application = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:3000',
  credentials: true,
}))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Request logging
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`)
  next()
})

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

// API Routes
app.use('/api/characters', charactersRouter)
app.use('/api/time-periods', timePeriodsRouter)
app.use('/api/chat', chatRouter)

// Error handlers
app.use(notFoundHandler)
app.use(errorHandler)

// Start server
app.listen(PORT, () => {
  console.log(`[Server] WikiPersona backend running on port ${PORT}`)
  console.log(`[Server] Environment: ${process.env.NODE_ENV || 'development'}`)
  console.log(`[Server] CORS origin: ${process.env.CORS_ORIGIN || 'http://localhost:3000'}`)
})

export default app
