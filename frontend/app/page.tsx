import Link from 'next/link'

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-blue-100 to-blue-200">
      <div className="text-center max-w-2xl">
        <h1 className="text-6xl font-bold mb-6 text-gray-800">WikiPersona</h1>
        <p className="text-xl mb-8 text-gray-600">
          Explore history through interactive 3D environments and have conversations with historical figures powered by AI
        </p>
        <Link
          href="/explore"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-colors"
        >
          Start Exploring
        </Link>
      </div>
    </main>
  )
}
