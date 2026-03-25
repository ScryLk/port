import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ScrollProvider } from '@/components/providers/ScrollProvider'
import { CustomCursor } from '@/components/ui/CustomCursor'

const jetbrains = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Lucas | Full Stack Developer',
  description: 'Portfolio — Full Stack Developer from Panambi, BR. Building immersive web experiences with React, Three.js, and Node.js.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={jetbrains.variable}>
      <body>
        <ScrollProvider>
          {children}
        </ScrollProvider>
        <CustomCursor />
      </body>
    </html>
  )
}
