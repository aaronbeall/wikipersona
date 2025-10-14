'use client'

interface LoadingScreenProps {
  isVisible: boolean
  message?: string
}

export default function LoadingScreen({ isVisible, message = 'Loading...' }: LoadingScreenProps) {
  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500 mx-auto mb-4"></div>
        <p className="text-white text-xl">{message}</p>
      </div>
    </div>
  )
}
