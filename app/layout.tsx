// app/layout.tsx
import './globals.css'
import type { Metadata } from 'next'
import NavBar from '@/components/NavBar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'Upgrade Wellness Center',
  description: 'Calm, evidence-informed care for everyday life.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-surface text-text-primary">
        <NavBar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
