import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'WikiPersona - Interactive Historical Experience',
  description: 'Explore history through interactive 3D environments and AI-powered conversations with historical figures',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
