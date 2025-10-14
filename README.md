# WikiPersona - Interactive Historical Wikipedia Experience

An immersive 3D web application where users control an avatar to explore historical locations and time periods. Navigate stylized 3D environments representing places around the world, control time periods, and engage in AI-powered conversations with historical characters from those eras.

## Features

- **3D Exploration**: Navigate Athens in a low-poly 3D environment with top-down camera view
- **Time Travel**: Switch between Ancient Greece, Medieval Athens, and Modern Athens
- **AI Conversations**: Talk to historical figures powered by OpenAI GPT-4
- **Interactive Characters**: Meet Socrates, Pericles, Plato, and other historical figures
- **WASD Controls**: Smooth character movement with keyboard controls
- **Wikipedia Integration**: Real-time character information from Wikipedia API with caching

## Technology Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React Three Fiber** - 3D rendering with Three.js
- **@react-three/drei** - Helpful 3D utilities
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling

### Backend
- **Express.js** - API server
- **PostgreSQL** - Database
- **Prisma** - ORM
- **OpenAI API** - AI-powered conversations
- **Wikipedia API** - Character information

## Project Structure

```
wikipersona/
├── frontend/           # Next.js application
│   ├── app/            # App Router pages
│   ├── components/     # React components
│   │   ├── Scene/      # 3D components (Avatar, Character, Environment, etc.)
│   │   ├── UI/         # UI overlays (ChatPanel, TimeWheel, etc.)
│   │   └── Models/     # 3D model components
│   ├── hooks/          # Custom React hooks
│   ├── contexts/       # React contexts
│   ├── lib/            # Utilities and API client
│   └── types/          # TypeScript types
│
├── backend/            # Express.js API
│   ├── src/
│   │   ├── routes/     # API routes
│   │   ├── services/   # Business logic
│   │   ├── middleware/ # Express middleware
│   │   └── prisma/     # Database schema and seed
│   └── dist/           # Compiled TypeScript
│
└── README.md
```

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm 9+
- PostgreSQL 14+ database
- OpenAI API key (optional for testing, mock responses will be used if not provided)

### 1. Install Dependencies

```bash
# Install root dependencies
npm install

# This will install dependencies for both frontend and backend workspaces
```

### 2. Set Up Database

Create a PostgreSQL database:

```bash
# Using psql
createdb wikipersona

# Or using PostgreSQL client
psql -U postgres
CREATE DATABASE wikipersona;
```

### 3. Configure Environment Variables

**Backend** - Copy and edit `.env` in `backend/`:

```bash
cd backend
cp .env .env.local
```

Edit `.env`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/wikipersona?schema=public"
OPENAI_API_KEY="sk-your-openai-api-key-here"
PORT=3001
CORS_ORIGIN="http://localhost:3000"
NODE_ENV="development"
```

**Frontend** - Edit `.env.local` in `frontend/`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### 4. Set Up Database Schema and Seed Data

```bash
cd backend

# Generate Prisma client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Seed the database with Athens data
npm run seed
```

This will create:
- 1 location (Athens)
- 3 time periods (Ancient, Medieval, Modern)
- 10 historical characters (Socrates, Pericles, Aspasia, Plato, etc.)

### 5. Run the Application

**Option 1: Run both servers from root** (recommended)

```bash
# From root directory
npm run dev
```

This starts both frontend (port 3000) and backend (port 3001) concurrently.

**Option 2: Run servers separately**

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Frontend:
```bash
cd frontend
npm run dev
```

### 6. Access the Application

Open your browser to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:3001
- **Backend Health**: http://localhost:3001/health

## Usage

1. **Landing Page**: Click "Start Exploring" to enter the 3D world
2. **Movement**: Use W/A/S/D keys to move your avatar around Athens
3. **Character Interaction**: Walk near a character (they'll glow red), press E to talk
4. **AI Conversation**: Chat with historical figures in the side panel
5. **Time Travel**: Click the time period wheel (bottom-right) to switch eras
6. **Explore**: Each era has different characters, buildings, and atmosphere

## API Endpoints

### Backend API

- `GET /health` - Health check
- `GET /api/time-periods?locationId={id}` - Get time periods for a location
- `GET /api/characters?timePeriodId={id}` - Get characters for a time period
- `POST /api/chat/send` - Send a message to a character

**Chat Request Body:**
```json
{
  "characterId": "uuid",
  "userMessage": "What is your philosophy?",
  "conversationHistory": [
    { "role": "user", "content": "Hello" },
    { "role": "assistant", "content": "Greetings!" }
  ]
}
```

## Development

### Database Management

```bash
# Open Prisma Studio to view/edit database
cd backend
npm run prisma:studio

# Create a new migration
npm run prisma:migrate

# Reset database (WARNING: deletes all data)
npx prisma migrate reset
```

### Code Structure

- **Frontend components** are organized by feature (Scene/, UI/)
- **Custom hooks** manage state and API calls
- **Backend services** handle business logic (Wikipedia, OpenAI, caching)
- **Prisma** manages database access with type safety

## Troubleshooting

### Database connection issues
- Verify PostgreSQL is running: `pg_isready`
- Check DATABASE_URL in backend/.env
- Ensure database exists: `psql -l | grep wikipersona`

### Frontend won't load
- Check if backend is running: `curl http://localhost:3001/health`
- Verify NEXT_PUBLIC_API_URL in frontend/.env.local
- Clear Next.js cache: `rm -rf frontend/.next`

### 3D scene not rendering
- Ensure browser supports WebGL
- Check browser console for Three.js errors
- Try disabling browser extensions

### Chat not working
- Verify OpenAI API key in backend/.env
- Check backend logs for API errors
- Without API key, mock responses will be used

## Future Enhancements

- [ ] Additional locations (Rome, Paris, Cairo, etc.)
- [ ] More time periods per location
- [ ] Click-to-move functionality
- [ ] Actual 3D models for characters and buildings
- [ ] Mobile support and touch controls
- [ ] User accounts and conversation history
- [ ] More sophisticated pathfinding
- [ ] Building interiors
- [ ] Sound effects and music
- [ ] Multiplayer exploration

## License

MIT License - See LICENSE file for details

## Credits

- Historical information from Wikipedia
- AI conversations powered by OpenAI
- Built with Next.js, React Three Fiber, and Express.js
