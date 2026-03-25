import type { Metadata } from 'next'
import { JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { ScrollProvider } from '@/components/providers/ScrollProvider'
import { CustomCursor } from '@/components/ui/CustomCursor'
import { I18nProvider } from '@/lib/i18n'

const jetbrains = JetBrains_Mono({
  variable: '--font-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Lucas | Desenvolvedor Full Stack',
  description: 'Portfólio — Desenvolvedor Full Stack de Panambi, BR. Criando experiências web imersivas com React, Three.js e Node.js.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt" className={jetbrains.variable}>
      <body>
        <I18nProvider>
          <ScrollProvider>
            {children}
          </ScrollProvider>
          <CustomCursor />
        </I18nProvider>
      </body>
    </html>
  )
}
