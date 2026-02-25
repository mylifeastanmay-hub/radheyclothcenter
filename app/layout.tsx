import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Radhey Cloth Center',
  description: 'Traditional Indian Wear Since 1995',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&family=Tiro+Devanagari+Hindi&display=swap" rel="stylesheet" />
      </head>
      <body>{children}</body>
    </html>
  )
}