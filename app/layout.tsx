import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Balancepro',
  description: 'Transform your life through accessible, online fitness services that restore posture, manage weight, and alleviate pain.',
  generator: 'v0.dev',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
